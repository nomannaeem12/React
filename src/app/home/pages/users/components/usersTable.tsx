import {User} from "../../../../core/interfaces/user.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {shortDate} from "../../../../shared/functions.ts";
import {navigationService} from "../../../../core/services/navigation.service.ts";
import StringAvatar from "../../../../shared/components/stringAvatar.tsx";

export function UsersTable({users}: { users: User[] }) {
    const {userProfile} = navigationService();
    const columns: GridColDef<(typeof rows)[number]>[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            renderCell: params => (
                <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}
                     onClick={() => userProfile(params.row.id)}>
                    <StringAvatar name={`${params.row.firstName.trim()} ${params.row.lastName.trim()}`} size={30}/>
                    <Box sx={{ml: 2}}>
                        {params.row.firstName || ''} {params.row.lastName || ''}
                    </Box>
                </div>
            ),
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
            valueFormatter: (params: { value: any; row: typeof rows[number] }) => `${shortDate(params.row.createdAt)}`,
        },
    ];
    const rows = [...users];

    return (
        <Box sx={{height: 'inherit'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
            />
        </Box>
    );
}