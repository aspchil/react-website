import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({ open, setOpen, proceed }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Please Confirm this operation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              padding: "8px",
              width: "50%",
              height: "38px",
              background: "#FFFFFF",
              borderRadius: "4px",
              textTransform: "none",
              flex: "none",
              order: 0,
              fontFamily: "Barlow Semi Condensed",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
              textAlign: "center",
              border: "1px solid #ECECEC",
              letterSpacing: "0.02em",
              color: "#07AA1F",
              ":hover": {
                bgcolor: "#5e5e5e",
                color: "white"
              }
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              proceed();
              setOpen(false);
            }}
            sx={{
              padding: "8px",
              gap: "16px",
              width: "50%",
              height: "38px",
              background: "#07AA1F",
              borderRadius: "4px",
              textTransform: "none",
              flex: "none",
              order: 0,
              fontFamily: "Barlow Semi Condensed",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
              textAlign: "center",
              letterSpacing: "0.02em",
              color: "#FFFFFF",
              ":hover": {
                bgcolor: "#5e5e5e",
                color: "white"
              }
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
