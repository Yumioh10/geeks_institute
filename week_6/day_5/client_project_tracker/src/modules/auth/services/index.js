import jwt from 'jsonwebtoken';
import { User } from '#@/modules/auth/model/index.js';

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register new user
export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User with this email already exists');
    error.status = 400;
    throw error;
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'member'
  });

  // Generate token
  const token = generateToken(user._id, user.role);

  return {
    user,
    token
  };
};

// Login user
export const loginUser = async (email, password) => {
  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // Check if user is active
  if (!user.isActive) {
    const error = new Error('Account is deactivated');
    error.status = 401;
    throw error;
  }

  // Compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // Generate token
  const token = generateToken(user._id, user.role);

  // Remove password from user object
  user.password = undefined;

  return {
    user,
    token
  };
};

// Get user by ID
export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Get all users (admin only)
export const getAllUsers = async () => {
  return await User.find({ isActive: true }).sort({ createdAt: -1 });
};

// Update user
export const updateUser = async (userId, updates) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Delete user (soft delete)
export const deleteUser = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};