import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../schemas/userSchema.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);

router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Protected profile route', userId: req.user.userId });
});

export default router;