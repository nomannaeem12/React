import {CircularProgress, DialogContent} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export function CustomLoader({open}: { open: boolean }) {
    return (
        <>
            <Dialog open={open} PaperProps={{style: {backgroundColor: 'transparent', boxShadow: 'none'}}}>
                <DialogContent>
                    <CircularProgress size={100}/>
                </DialogContent>
            </Dialog>
        </>
    );
}
