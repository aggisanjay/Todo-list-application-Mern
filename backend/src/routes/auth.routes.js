import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();
const cookie = { httpOnly: true, sameSite: "none", secure: true };

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return res.cookie("token", token, cookie).json({
    user,
    token,
  });
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
    
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
 

  return res.cookie("token", token, cookie).json({
    user,
    token,
  });
  

});

// ✅ GET LOGGED-IN USER
router.get("/me", async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.json(null);

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    return res.json(user);
  } catch {
    return res.json(null);
  }
});

// ✅ LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ ok: true });
});

export default router;
