import { Modal } from "antd";
import React from "react";
import SuccessModalPage from "../HomePage/SuccessModalPage";

export default function SuccessModal({ isOpen, handleCancel, handleOk }) {
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
        <SuccessModalPage />
      </div>
    </Modal>
  );
}
