import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

import Input from "../../components/Input/input";
import ListBox from "../../components/ListBox";
import UserInfo from "../../components/UserInfo";
import { getAllUsers, searchUsers } from "../../utils/api";
import { REQ_CALL_TIMEOUT } from "../../constants";
import styles from "./style.module.scss";

const Users = () => {
  const [modalObj, setModalObj] = useState({
    open: false,
    loginName: null,
  });
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [searchOn, setSearchOn] = useState(false);
  const [sinceId, setSinceId] = useState(null);

  const toggleModal = (loginName) => {
    setModalObj({
      open: !modalObj.open,
      loginName: !modalObj.open ? loginName : null,
    });
  };

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers({ since: sinceId || 0 });
      setUsers([...users, ...res.data]);
      let lastId = null
      if (res?.data?.length) {
        lastId = res.data[res.data.length - 1].id
        setSinceId(lastId)
      }
    } catch (e) {
      console.log("ERR", e?.response?.data?.message || e?.message);
    }
  };

  const findUsers = (payload) => searchUsers(payload)

  const onSearch = async (e) => {
    try {
      const value = e.target.value;
      if (value) {
        setSearchOn(true)
        const payload = {
          q: value
        }
        const res = await findUsers(payload);
        setUsers(res.data.items);
      } else {
        setSearchOn(false)
        fetchAllUsers();
      }
    } catch (e) {
      console.log("ERR", e?.response?.data?.message || e?.message);
    }
  };

  const onEndReached = (e) => {
    try {
      const endReached =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  
      if (endReached) {
        // if (searchOn) {
        //   const data = nextPage.split("?")
        //   const params = 
        //   console.log("Parmas", params[1].split('&'))
        //   // findUsers()
        // }
         if (!searchOn && sinceId) {
          console.log("IFFFF")
          fetchAllUsers()
        }
      } 
    } catch(e) {
      console.log("ERR", e?.response?.data?.message || e?.message);
    }
  };

  const debouncedSearch = debounce(onSearch, REQ_CALL_TIMEOUT);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className={styles.container} onScroll={onEndReached}>
      <UserInfo
        isOpen={modalObj.open}
        onRequestClose={toggleModal}
        loginName={modalObj.loginName}
      />
      <div className={styles.dataBox}>
        <h2 className={styles.title}>Github Users</h2>
        <div className={styles.inputBox}>
          <Input placeholder="Search User" onChange={debouncedSearch} />
        </div>
        <div className={styles.userBox}>
          {!!users.length ? (
            users.map((item) => (
              <div className={styles.mt20}>
                <ListBox
                  onNameClick={() => toggleModal(item.login)}
                  data={{
                    pic: item.avatar_url,
                    profileUrl: item.html_url,
                    username: item.login,
                  }}
                />
              </div>
            ))
          ) : (
            <p className={styles.message}>No User Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
