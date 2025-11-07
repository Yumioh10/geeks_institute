import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
   await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("🎉 Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};
connectDB();
// create a user database test
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 }
});

const User = mongoose.model("User", userSchema);

User.create({ name: "John Doe", email: "john.doe@example.com"})
  .then(() => console.log("User created successfully"))
  .catch((error) => console.error("Error creating user:", error));

User.create({name: "Sarah Smith", email: "sarah.smith@example.com"})
  .then(() => console.log("User created successfully"))
  .catch((error) => console.error("Error creating user:", error));

User.create({ name: "Diana Lee", email: "diana.lee@example.com"})
  .then(() => console.log("User created successfully"))
  .catch((error) => console.error("Error creating user:", error));

const Project = mongoose.model("Project", new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}));

const Task = mongoose.model("Task", new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
}));

connectDB();