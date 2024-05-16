import * as React from "react";
import {useContext, useEffect, useState} from "react";
import userService from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";
import {Box} from "@mui/material";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";
import Button from "@mui/material/Button";
import {AddUserDialog} from "./components/addUserDialog.tsx";

export function Users() {
    const {toggleLoading} = useContext(LoaderContext);
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        toggleLoading(true);
        userService.getUsers().then((response: User[]) => {
            setUsers(response);
            toggleLoading(false);
        })
    }, [])
    const addNewUser = (data: User) => {
        setUsers([data, ...users]);
    };
    return (
        <>
            <Box sx={{textAlign: "end"}}>
                <Box sx={{m: '15px 0'}}>
                    <AddUserDialogButton addNewUser={addNewUser}/>
                </Box>
                <UsersTable users={users}/>
            </Box>
        </>
    )
}


function AddUserDialogButton({addNewUser}: { addNewUser: (data: User) => void }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data?: User) => {
        setOpen(false);
        if (data)
            addNewUser(data);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add User
            </Button>
            <AddUserDialog
                open={open}
                onClose={handleClose}
            />
        </>
    );
}