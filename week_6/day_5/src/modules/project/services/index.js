import { projectModel } from '#@/modules/project/model/index.js';

export async function createProject(data, ownerId) {
    const project = await projectModel.create({
        ...data,
        owner: ownerId
    });
    return project;
}

export async function getAllProjects(user) {
    const filter = user.role === 'admin' ? {} : { owner: user._id };
    const projects = await projectModel.find(filter).populate('owner', 'email role');
    return projects;
}

export async function getProjectById(projectId, user) {
    const filter = user.role === 'admin' ? {} : { owner: user._id };
    const project = await projectModel.findOne({ _id: projectId, ...filter }).populate('owner', 'email role');
    return project;
}

export async function updateProject(projectId, data, user) {
    const project = await projectModel.findById(projectId);
    
    if (!project) {
        return null; 
    }

    const isOwner = project.owner.toString() === user._id.toString();
    const isAdmin = user.role === 'admin';

    if (!isOwner && !isAdmin) {
        throw new Error('Access forbidden. You do not own this project.'); 
    }

    Object.assign(project, data);
    await project.save();
    
    return project;
}

export async function deleteProject(projectId, user) {
    const project = await projectModel.findById(projectId);
    
    if (!project) {
        return false; 
    }

    const isOwner = project.owner.toString() === user._id.toString();
    const isAdmin = user.role === 'admin';

    if (!isOwner && !isAdmin) {
        throw new Error('Access forbidden. You do not own this project.');
    }

    await project.deleteOne();
    return true;
}