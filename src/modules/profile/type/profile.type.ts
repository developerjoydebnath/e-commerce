import z from 'zod';
import { profileSchema, updatePasswordSchema } from '../dto/profile.dto';

export type ProfileDto = z.infer<typeof profileSchema>;
export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
