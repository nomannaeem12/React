import {User} from "../../../../core/interfaces/user.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {shortDate} from "../../../../shared/functions.ts";

export function UsersTable({users}: { users: User[] }) {
    const columns: GridColDef<(typeof rows)[number]>[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'Name',
            headerName: 'Name',
            width: 150,
            valueFormatter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            width: 160,
            valueFormatter: (value, row) => `${shortDate(row.createdAt)}`
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 250,
            valueFormatter: (value, row) => `${row.role.replace(/_/g, ' ')}`
        },
        {
            field: 'lastActivity',
            headerName: 'Last Activity',
            width: 160,
            valueFormatter: (value, row) => `${shortDate(row.lastActivity)}`
        },
        {
            field: 'lastLogin',
            headerName: 'Last Login',
            width: 160,
            valueFormatter: (value, row) => `${shortDate(row.lastLogin)}`
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 160,
            valueFormatter: (value, row) => `${row.status}`
        },
    ];

    const rows = [...users];


    return (
        <Box sx={{height: 800, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
            />
        </Box>
    );
}