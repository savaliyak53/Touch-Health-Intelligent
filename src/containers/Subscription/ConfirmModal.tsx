import React, { useState } from 'react';
import { DatePicker, Modal, Button } from 'antd';
export type IProps = {
  visible: boolean;
  handleCancel: () => any;
  handleOk: any;
  renderData?: any;
  title: string;
};
const ConfirmModal = ({
  visible,
  handleCancel,
  title,
  handleOk,
  renderData,
}: IProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      closable={false}
      footer={
        <div className="Btn-group">
          <Button className="Modal-cancel-btn Subscribe" onClick={handleCancel}>
            No
          </Button>
          <Button className="Subscribe" onClick={handleOk}>
            Yes
          </Button>
        </div>
      }
    >
      {renderData}
    </Modal>
  );
};

export default ConfirmModal;
