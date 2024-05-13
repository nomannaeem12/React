import {BasicEntity} from "./basic-entity.interface.ts";

export interface User extends BasicEntity {
    firstName: string;
    lastName: string;
    jobTitle: string;
    role: Role_Types;
    status: Status_Types;
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiration?: Date;
    firstLogin?: boolean;
    lastLogin: Date;
    lastActivity: Date;
    scopes: string[];
}

export enum Status_Types {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
}

export enum Role_Types {
    SUPERADMIN = 'SUPERADMIN',
    Customer_Sales_Representative = 'Customer_Sales_Representative',
    Carrier_Sales_Representative = 'Carrier_Sales_Representative',
    Accounting_Representative = 'Accounting_Representative',
    Pallets_Sales_Specialist = 'Pallets_Sales_Specialist',
    Data_Entry_Specialist = 'Data_Entry_Specialist',
    Custom = 'Custom'
}