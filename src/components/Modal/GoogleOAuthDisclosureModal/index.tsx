import React from 'react';
import { Modal, Button } from 'antd';
import styles from './GoogleOAuthDisclosureModal.module.scss';
export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  renderData?: any;
  title: string;
};
const GoogleOAuthDisclosureModal = ({
  open,
  handleCancel,
  title,
  handleOk,
  renderData,
}: IProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      className={"Delete-Modal"} 
      footer={[
        <div  key="submit" className={styles["Btn-group"]}>
          <Button key="submit" className={"Submit-Button"} onClick={handleOk}>
            Acknowledge
          </Button>
          <Button key="submit" className={"Submit-Button"} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      ]
      }
    >
      <div className={styles["Data"]}>
        {renderData}
      </div>
    </Modal>
  );
};

export default GoogleOAuthDisclosureModal;
