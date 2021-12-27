import React, { useContext } from "react";

import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function CustomDialog(props) {
  const {
    // title,
    children,
    modalData,
    setModalData,

    onYesClicked,
    deletingID,
    ...otherProps
  } = props;

  const handleClose = () => {
    setModalData(() => {
      return { isOpen: false, title: "", data: {} };
    });
  };

  return (
    <Dialog open={modalData.isOpen} fullWidth onClose={handleClose}>
      <DialogTitle>{modalData.title}</DialogTitle>
      <DialogContent dividers>
        {children}
        <FlexBox>
          <Button
            variant="outlined"
            onClick={() => setModalData({ isOpen: false, title: "", data: {} })}
          >
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onYesClicked(modalData.data);
              setModalData({ isOpen: false, title: "", data: {} });
            }}
          >
            Yes
          </Button>
        </FlexBox>
      </DialogContent>
    </Dialog>
  );
}
