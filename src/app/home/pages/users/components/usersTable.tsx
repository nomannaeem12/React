import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {User} from "../../../../core/interfaces/user.ts";
import moment from 'moment';

function formatDateToShort(value: Date): string {
    return moment(value).format('h:mm a, M/d/yy');
}


export function UsersTable({users}: { users: User[] }) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{width: 'max-content', height: 500, minWidth: 1000}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>ID #</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Created At</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Role</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Last Activity</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Last Login</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.filter(user => user).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{formatDateToShort(user.createdAt)}</TableCell>
                                <TableCell>{user.role.replaceAll('_', ' ')}</TableCell>
                                <TableCell>{formatDateToShort(user.lastActivity)}</TableCell>
                                <TableCell>{formatDateToShort(user.lastLogin)}</TableCell>
                                <TableCell>{user.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}