import React from "react";

import Modal from "../Modal";
import DetailsBox from "./DetailsBox";
import styles from "./styles.module.scss";

const UserInfo = ({isOpen, onRequestClose}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.topSection}>
        <img
          src="https://avatars.githubusercontent.com/u/38138258?v=4"
          className={styles.userImage}
        />
        <p>Faraz Jahangir</p>
      </div>
      <div className={styles.detailsBox}>
        <DetailsBox />
        <DetailsBox />
        <DetailsBox />
      </div>
    </Modal>
  );
};

export default UserInfo;
