import React from "react";
import { Modal } from "react-bootstrap";

export const SuccessModal = ({ setOpenModal }) => {
  return (
    <div className={Modal.modalBackground}>
      <div className={Modal.modalContainer}>
        <div className={Modal.titleCloseBtn}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};
