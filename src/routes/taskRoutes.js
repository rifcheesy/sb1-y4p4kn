import { Router } from 'express';
import { taskController } from '../controllers/taskController.js';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import { createTaskSchema, updateTaskSchema, deleteTaskSchema } from '../schemas/taskSchema.js';

const router = Router();

router.use(auth); // Protect all task routes

router.post('/', validate(createTaskSchema), taskController.create);
router.get('/', taskController.list);
router.put('/:id', validate(updateTaskSchema), taskController.update);
router.delete('/:id', validate(deleteTaskSchema), taskController.delete);

export default router;