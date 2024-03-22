import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce"

import Input from "../../components/Input/input";
import ListBox from "../../components/ListBox";
import UserInfo from "../../components/UserInfo";
import { getAllUsers, searchUsers } from "../../utils/api";
import { REQ_CALL_TIMEOUT } from "../../constants";
import styles from "./style.module.scss";

const Users = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalIsOpen);
  };

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (e) {
      console.log("ERR", e?.response?.data?.message);
    }
  };

  const onSearch = async(e) => {
    try {
      const value =  e.target.value
      if (value) {
        const res = await searchUsers({q: value})
        setUsers(res.data.items)
      } else {
        fetchAllUsers()
      }
    } catch(e) {
      console.log("ERR", e?.response?.data?.message || e?.message)
    }
  }
    
  const debouncedSearch = debounce(onSearch, REQ_CALL_TIMEOUT);

  useEffect(() => {
      fetchAllUsers();
  }, []);


  return (
    <div className={styles.container}>
      <UserInfo isOpen={modalIsOpen} onRequestClose={toggleModal} />
      <div className={styles.dataBox}>
        <h2 className={styles.title}>Github Users</h2>
        <div className={styles.inputBox}>
          <Input placeholder="Search User" onChange={debouncedSearch} />
        </div>
        <div className={styles.userBox}>
          {!!users.length
            ? users.map((item) => (
                <div className={styles.mt20}>
                  <ListBox
                    onNameClick={toggleModal}
                    data={{
                      pic: item.avatar_url,
                      profileUrl: item.html_url,
                      username: item.login,
                    }}
                  />
                </div>
              ))
            : <p className={styles.message}>No User Found</p>}
        </div>
      </div>
    </div>
  );
};

export default Users;
