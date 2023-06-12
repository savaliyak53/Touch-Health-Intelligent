import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import styles from './DeleteSessionModal.module.scss';
import InputField from '../../Input';
export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  title: string;
};
const DeleteSessionModal = ({
  open,
  handleCancel,
  title,
  handleOk,
}: IProps) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      className={"Delete-Modal"} 
      footer={[
        <div  key="submit" className={styles["Btn-group"]}>
          <Button key="submit" className={'Submit-Button'} onClick={handleOk}>
           Confirm
          </Button>
        </div>
      ]
      }
    >
      <div className={styles["Data"]}>
      <InputField
            placeholder="Password"
            type={passwordShown ? 'text' : 'password'}
            className={styles['app-Input']}
            isEye={true}
            togglePassword={togglePassword}
          />
      </div>
    </Modal>
  );
};

export default DeleteSessionModal;
