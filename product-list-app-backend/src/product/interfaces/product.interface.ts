import { Document } from 'mongoose';

export interface Product extends Document {
    readonly name: string;
    readonly code: string;
    readonly weight: number;
    readonly price: number;
    readonly color: string;
    readonly isDeleted: boolean;
}