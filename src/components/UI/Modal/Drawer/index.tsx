import React from 'react';
import { Modal } from 'antd';
import styles from 'components/UI/Modal/Drawer/Drawer.module.scss';
export type IProps = {
  open: boolean;
  title: string;
  handleCancel: () => void;
  renderOptions: JSX.Element;
  className?: string;
};
const Drawer = ({ open, handleCancel, title, renderOptions }: IProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      className={'Drawer'}
      footer={null}
    >
      <div className={styles['Btn-group']}>{renderOptions}</div>
    </Modal>
  );
};

export default Drawer;
