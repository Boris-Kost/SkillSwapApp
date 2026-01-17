import { Skill } from './skill.types';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    university?: string;
    bio?: string;
    rating: number;
    level: number;
    tokens: number;
    skillsTeach: Skill[];
    skillsLearn: Skill[];
    createdAt: Date;
    isOnline: boolean;
}
