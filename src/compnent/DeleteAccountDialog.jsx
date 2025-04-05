import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button
} from "@mui/material";

const DeleteAccountDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: 3,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                    p: 1
                }
            }}
        >
            <DialogTitle sx={{ fontWeight: 600, color: '#ff4757' }}>Confirm Account Deletion</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    sx={{
                        borderRadius: 2,
                        px: 3
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="error"
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        bgcolor: '#ff4757',
                        px: 3,
                        '&:hover': {
                            bgcolor: '#ff5e6a'
                        }
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;