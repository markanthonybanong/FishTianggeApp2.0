export interface Rating {
    user_id: string;
    store_id: string;
    rating: string;
    feedback?: string;
    date_rate: Date;
}