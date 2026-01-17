import { User } from './user.types';
import { Skill } from './skill.types';

export interface Session {
    id: string;
    teacher: User;
    student: User;
    skill: Skill;
    scheduledAt: Date;
    duration: number; // in minutes
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    tokensAmount: number;
    meetingLink?: string;
    notes?: string;
}
