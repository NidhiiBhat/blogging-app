import { Modal } from "antd";
import React from "react";
import LogoutModalPage from "../BlogsPage/LogoutModalPage";

export default function LogoutModal({ isOpen, handleCancel, handleOk }) {
  return (
    <Modal
      open={isOpen}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      footer={null}
      mask
      keyboard={false}
    >
      <div className="">
        <LogoutModalPage />
      </div>
    </Modal>
  );
}
