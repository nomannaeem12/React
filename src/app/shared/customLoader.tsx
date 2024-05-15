import {CircularProgress, DialogContent} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export function CustomLoader() {
    return (
        <>
            <Dialog PaperProps={{style: {backgroundColor: 'transparent', boxShadow: 'none'}}}>
                <DialogContent>
                    <CircularProgress size={100}/>
                </DialogContent>
            </Dialog>
        </>
    );
}
