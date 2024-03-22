import React, { useState } from "react";

import Input from "../../components/Input/input";
import ListBox from "../../components/ListBox";
import UserInfo from "../../components/UserInfo";
import styles from "./style.module.scss";

const Users = () => {
  const [modalIsOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalIsOpen)
  }
  return (
    <div className={styles.container}>
      <UserInfo isOpen={modalIsOpen} onRequestClose={toggleModal} />
      <div className={styles.dataBox}>
        <h2 className={styles.title}>Github Users</h2>
        <div className={styles.inputBox}>
          <Input placeholder="Search User" />
        </div>
        <div className={styles.userBox}>
          <ListBox onNameClick={toggleModal} />
        </div>
      </div>
    </div>
  );
};

export default Users;
