import { Modal } from "antd";
import React from "react";
import DeleteModal from "../BlogsPage/DeleteModalPage";

export default function BaseModal({ isOpen, handleCancel, handleOk }) {
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
        <DeleteModal />
      </div>
    </Modal>
  );
}
