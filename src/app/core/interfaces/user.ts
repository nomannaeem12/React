import {BasicEntity} from "./basic-entity.interface.ts";

export interface User extends BasicEntity {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetToken: string;
    resetTokenExpiration: Date;
}
