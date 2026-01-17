export interface Transaction {
    id: string;
    type: 'earned' | 'spent' | 'purchased' | 'refunded';
    amount: number;
    description: string;
    date: Date;
    relatedUser?: {
        id: string;
        name: string;
        avatar?: string;
    };
}
