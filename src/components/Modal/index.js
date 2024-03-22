import React from "react";
import RModal from "react-modal";

import closeIcon from "../../assets/icons/close.png";
import styles from "./style.module.scss";

const Modal = ({ children, isOpen, onRequestClose }) => {
  return (
    <RModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div>
        <div className={styles.closeIconBox}>
          <img src={closeIcon} alt="closeIcon" className={styles.closeIcon} onClick={onRequestClose} />
        </div>
        {children}
      </div>
    </RModal>
  );
};

export default Modal;
