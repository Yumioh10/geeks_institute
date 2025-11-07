import jwt from 'jsonwebtoken';
import { userModel } from '#@/modules/auth/model/index.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d';

/**
 * Generates a JWT token for a given user.
 * @param {object} user - The user document.
 * @returns {string} The generated JWT.
 */
function generateToken(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

/**
 * Registers a new user.
 * @returns {{token: string, user: object}} The JWT and created user object.
 */
export async function registerUser({ email, password, role = 'member' }) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists.');
    }
    const newUser = await userModel.create({ email, password, role });
    const token = generateToken(newUser);
    
    const user = newUser.toObject();
    delete user.password;
    
    return { token, user };
}

/**
 * Logs in a user.
 * @returns {{token: string, user: object}} The JWT and logged-in user object.
 */
export async function loginUser({ email, password }) {
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error('Invalid email or password.');
    }

    const token = generateToken(user);

    const userData = user.toObject();
    delete userData.password;
    
    return { token, user: userData };
}
