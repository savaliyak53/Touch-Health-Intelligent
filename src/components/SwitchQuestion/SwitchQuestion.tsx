import React from 'react';
import { Button, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './SwitchQuestion.scss';
type Props = {
  title?: string;
  text?: string;
  checked?: boolean;
  id?: string;
  handleClose?: any;
};

const SwitchQuestion = ({ title, text, checked }: Props) => {
  return (
    <>
      <div className="Single-Switch">
        <div className="Text-wrap">
          {title == '' ? '' : <h4 className="title">{title}</h4>}
          <p className="text">{text}</p>
        </div>
        <div className="Switch-btn-wrap">
          {checked ? <Switch defaultChecked /> : <Switch />}
          <Button className="">
            <CloseOutlined />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SwitchQuestion;
