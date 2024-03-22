import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

import Input from "../../components/Input/input";
import ListBox from "../../components/ListBox";
import UserInfo from "../../components/UserInfo";
import { getAllUsers, searchUsers } from "../../utils/api";
import { REQ_CALL_TIMEOUT, PER_PAGE } from "../../constants";
import styles from "./style.module.scss";

const Users = () => {
  const [modalObj, setModalObj] = useState({
    open: false,
    loginName: null,
  });
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [searchOn, setSearchOn] = useState({
    isOn: false,
    totalPages: 0,
  });
  const [sinceId, setSinceId] = useState(0);
  const [searchText, setSearchText] = useState("");

  const toggleModal = (loginName) => {
    setModalObj({
      open: !modalObj.open,
      loginName: !modalObj.open ? loginName : null,
    });
  };

  const fetchAllUsers = async () => {
    try {
      if (nextPage !== 1) {
        setNextPage(1)
      }
      const res = await getAllUsers({ since: sinceId });
      let prevData = []
      if (sinceId != 0) {
        prevData = [...users]
      }
      setUsers([...prevData, ...res.data]);
      setSearchOn({
        isOn: false,
        totalPages: 0,
      });
      let lastId = null;
      if (res?.data?.length) {
        lastId = res.data[res.data.length - 1].id;
        setSinceId(lastId);
      }
    } catch (e) {
      console.log("ERR", e?.response?.data?.message || e?.message);
    }
  };

  const findUsers = async () => {
    try {
      if (sinceId !== 0) {
        setSinceId(0)
      }
      const payload = {
        q: searchText,
        page: nextPage,
      };
      const res = await searchUsers(payload);
      let prevData = [...users];
      if (nextPage === 1) {
        prevData = []
      }
      setUsers([...prevData, ...res.data.items]);
      setSearchOn({
        isOn: true,
        totalPages: Math.floor(res.data.total_count / PER_PAGE),
      });
    } catch (e) {
      console.log("ERR", e?.response?.data?.message || e?.message);
    }
  };

  const onSearch = async (e) => {
    const value = e?.target?.value;
    setSearchText(value);
  };

  const onEndReached = (e) => {
    try {
      const endReached =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

      if (endReached) {
        if (searchOn.isOn && nextPage !== searchOn.totalPages) {
         setNextPage(nextPage + 1)
        }
        if (!searchOn.isOn && sinceId) {
          fetchAllUsers();
        }
      }
    } catch (e) {
      console.log("ERR", e?.response?.data?.message || e?.message);
    }
  };

  const debouncedSearch = debounce(onSearch, REQ_CALL_TIMEOUT);

  useEffect(() => {
    if (nextPage !== searchOn.totalPages && searchText) {
      findUsers();
    }
    if (!searchText) {
      fetchAllUsers();
    }
  }, [nextPage, searchText]);

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
              <div className={styles.mt20} key={item.id}>
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
