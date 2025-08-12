import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  open: boolean;
  title: string;
  content: any;
  deleteFunc: () => Promise<void>;
  onSuccess?: () => void;
  handleReject: () => void;
  handleClose: () => void;
  deleteButtonDisabled?: boolean;
  customDeleteButtonText?: string;
  customDeleteButtonIon?: ReactNode;
}

const DeleteConfirmationModal = ({
  open,
  title,
  content,
  handleClose,
  deleteFunc,
  handleReject,
  onSuccess = () => {},
  deleteButtonDisabled,
  customDeleteButtonText,
  customDeleteButtonIon,
}: Props) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby={title + "-dialog"}
    >
      <DialogTitle id={title + "-dialog"}>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={submitting}
          variant="text"
          onClick={() => {
            handleReject();
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--primary-light)" }}
          startIcon={
            customDeleteButtonIon ? (
              customDeleteButtonIon
            ) : submitting ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              <DeleteIcon />
            )
          }
          disabled={submitting || deleteButtonDisabled}
          onClick={async () => {
            try {
              setSubmitting(true);
              await deleteFunc();
              handleClose();
              onSuccess();
            } catch (err) {
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {customDeleteButtonText
            ? customDeleteButtonText
            : submitting
            ? "Deleting.."
            : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
