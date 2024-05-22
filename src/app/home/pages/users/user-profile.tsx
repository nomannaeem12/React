import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import userService from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";
import Box from "@mui/material/Box";
import StringAvatar from "../../../shared/components/stringAvatar.tsx";
import {Card} from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from "@mui/material/IconButton";

export function UserProfile() {
    const {id} = useParams();
    const {toggleLoading} = useContext(LoaderContext);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        toggleLoading(true);
        userService.getUserById(+id!)
            .then((user) => {
                setUser(user);
                toggleLoading(false);
            })
    }, [id])

    return (
        user &&
        <>
            <Card sx={{
                padding: '10px'
            }}>
                <Box sx={{height: '100%', width: '100%'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box sx={{display: 'flex'}}>
                            <StringAvatar name={`${user.firstName.trim()} ${user.lastName.trim()}`} size={50}/>
                            <Box sx={{ml: 2}}>
                                <Box sx={{fontSize: '20px', fontWeight: 'bold'}}>{user.firstName} {user.lastName}</Box>
                                <Box sx={{lineHeight: '0.6'}}>{user.email}</Box>
                            </Box>
                        </Box>
                        <Box sx={{ml: 4}}>
                            <IconButton color='secondary'>
                                <EditRoundedIcon/>
                            </IconButton>
                            <IconButton color='error'>
                                <DeleteRoundedIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

            </Card>

        </>
    )
}