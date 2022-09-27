import React, { useState } from 'react';
import { DatePicker, Modal, Button } from 'antd';
export type IProps = {
    visible:boolean;
    handleCancel: ()=>any;
    handleOk:any; 
    renderData?:any ;
    title:string;
  };
const ConfirmModal = ({visible, handleCancel,title, handleOk, renderData}:IProps) => {
  return (
    <Modal
    title={title}
    visible={visible}
    closable={false}
    footer={
      <div className="Btn-group">
        <Button
          className="Modal-cancel-btn Subscribe"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="Subscribe"
          onClick={handleOk}
        >
          Ok
        </Button>
      </div>
    }
  >
    {renderData}
  </Modal>
  );
};

export default ConfirmModal;
