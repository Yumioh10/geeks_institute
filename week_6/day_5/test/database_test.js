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

User.create({ name: "John Doe", email: "john.doe@example.com", age: 30 })
  .then(() => console.log("User created successfully"))
  .catch((error) => console.error("Error creating user:", error));

User.create({name: "Sarah Smith", email: "sarah.smith@example.com", age: 25 })
  .then(() => console.log("User created successfully"))
  .catch((error) => console.error("Error creating user:", error));

User.create({ name: "Diana Lee", email: "diana.lee@example.com", age: 28 })
  .then(() => console.log("User created successfully"))
  .catch((error) => console.error("Error creating user:", error));