import { z } from 'zod';
import { UserRole } from '../../config/constants';

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
});

export const RegisterSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    role: z.nativeEnum(UserRole).optional(),
    orgCode: z.string().optional()
  })
});

export type LoginInput = z.infer<typeof LoginSchema>['body'];
export type RegisterInput = z.infer<typeof RegisterSchema>['body'];
