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
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <div  key="submit" className="Btn-group">
          <Button key="submit" className="Subscribe" onClick={handleOk}>
           Confirm
          </Button>
        </div>
      ]
      }
    >
      {renderData}
    </Modal>
  );
};

export default ConfirmModal;
