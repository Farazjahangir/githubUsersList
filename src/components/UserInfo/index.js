import React, { useEffect, useState } from "react";

import Modal from "../Modal";
import DetailsBox from "./DetailsBox";
import { getUser } from "../../utils/api";
import dummyUser from "../../assets/images/user.jpeg"
import styles from "./styles.module.scss";

const UserInfo = ({ isOpen, onRequestClose, loginName }) => {
  const [data, setData] = useState(null)

  const fetchUser = async () => {
   try {
    const res = await getUser(loginName)
    setData(res.data)
   } catch(e) {
    console.log("ERR", e?.response?.data?.message)
   }
  }

  const onCloseModal = () => {
    setData(null)
    onRequestClose()
  }

  useEffect(() => {
    if (isOpen) {
      fetchUser()
    }
  },[isOpen])

  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseModal}>
      <div className={styles.topSection}>
        <img
          src={data?.avatar_url || dummyUser}
          className={styles.userImage}
        />
        <p>{data?.name}</p>
      </div>
      <div className={styles.detailsBox}>
        <DetailsBox title='Email' value={data?.email || "-"} />
        <DetailsBox title='Followers' value={data?.followers} />
        <DetailsBox title='Following' value={data?.following} />
        <DetailsBox title='Public Gists' value={data?.public_gists} />
        <DetailsBox title='Public Repo' value={data?.public_repos} />
        <DetailsBox title='Location' value={data?.location || "-"} />
        <DetailsBox title='Profile URL' value={data?.html_url} type="url" />
      </div>
    </Modal>
  );
};

export default UserInfo;
