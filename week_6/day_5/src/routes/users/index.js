import { Router } from "express";
import usersRoutes from "./users/index.js";

import { registerUser, loginUser } from "#@/modules/[auth]/services/index.js";

const authRouter = Router();

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ message: 'Email and password are required.'});    
      }

      const { token, user } = await registerUser({ email, password });

      return res.status(201).json({
         message: 'Registration successful.',
         token,
         user
      });
   } catch (error) {
      if (error.message.includes('exists')) {
         return res.status(409).json({ message: error.message });
      }
      return res.status(400).json({ message: error.message || 'Registration failed.'
});
   }
});

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ message: 'Email and password are required.'})
      }

      const { token, user } = await loginUser({ email, password })

      return res.status(200).json({
         message: 'Login successful.',
         token,
         user
      });
   } catch (error) {
      return res.status(401).json({ message: 'Invalid email or password.'})
   }
});

router.use("/users", usersRoutes);

export default authRouter;
