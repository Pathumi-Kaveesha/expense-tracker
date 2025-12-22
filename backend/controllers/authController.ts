import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
};

// Register User
export const registerUser = async (req: Request, res: Response) => {

  if (!req.body) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id.toString()),
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};


// Login User
export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try{
    const user = await User.findOne({email});
    if(!user || !(await user.comparePassword(password))){
       return res.status(400).json({ message: "Invalid Credentials" }); 
    }

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id.toString()),
    });
  }catch (err: any) {
    res.status(500).json({
      message: "Error logging user",
      error: err.message,
    });
}};

// Get User Info
export const getUserInfo = async (req: Request, res: Response) => {
    try{
        const user = await User.findById((req as any).user.id).select("-password");
        if (!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);
    }catch (err: any) {
    res.status(500).json({
      message: "Error finding user",
      error: err.message,
    });
}};
