import React from 'react';
import { Modal, Button } from 'antd';
import styles from './ListItem.module.scss';
import {
  RightOutlined,
  CloseOutlined
} from '@ant-design/icons';

export type IProps = {
  index: number;
  handleClick: any;
  item: any;
  name: string;
  status?: string;
  handleClose?:any;
  closable?:boolean;
  title?: string;
};
const ListItem = ({
  index,
  handleClick,
  handleClose,
  item,
  status,
  name,
  closable,
}: IProps) => {
  return (
    <div
      key={index}
      className={styles['Selected-Goal']}
    >
        <div className={styles['Mygoals-Title']}>
          <span 
            className={styles['Rec-Text']}               
            onClick={() => handleClick(item,status)}
          >
            {name || ""}
          </span>
          {closable?
          <Button
            className={styles['Arrow-btn']}
            onClick={() => handleClose(item)}
          >
            <CloseOutlined className={styles['Cross']}  />
          </Button>
          :
          <Button
            onClick={() => handleClick(status, item.info, item.data)}
            className={styles['Arrow-btn']}
          >
            <RightOutlined className={styles['Cross']} />
          </Button>}
          
        </div>
    </div>
  );
};

export default ListItem;
