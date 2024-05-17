import {CircularProgress, DialogContent} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {LoaderContext} from "../../core/providers/loaderProvider.tsx";
import {useContext} from "react";

export function CustomLoader() {
    const {isLoading} = useContext(LoaderContext);
    return (
        <>
            <Dialog open={isLoading} PaperProps={{style: {backgroundColor: 'transparent', boxShadow: 'none'}}}>
                <DialogContent>
                    <CircularProgress size={100}/>
                </DialogContent>
            </Dialog>
        </>
    );
}

