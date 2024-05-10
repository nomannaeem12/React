export interface BasicEntity {
    id: number;
    createdAt: Date;
    createdBy: number;
    updatedBy?: number;
    updatedAt: Date;
    deletedAt?: Date;
}
