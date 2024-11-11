import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    dueDate: z.string().datetime().optional()
  })
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    status: z.enum(['pending', 'in_progress', 'completed']),
    dueDate: z.string().datetime().optional()
  })
});

export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});