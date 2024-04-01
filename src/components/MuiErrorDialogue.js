import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


export default function MuiErrorDialog({ open, callback }) {
    const [isOpen, setIsOpen] = useState(open);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    callback();
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Oops"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Something went wrong. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              padding: "8px",
              width: "50%",
              height: "38px",
              visibility: "hidden",
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
            Continue
          </Button>
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
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
