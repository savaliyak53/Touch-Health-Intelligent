import React from 'react';
import { Button, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './SwitchQuestion.scss';
type Props = {
  title?: string;
  text?: string;
  checked?: boolean;
  id: string;
  handleClose?: any;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, checked: boolean) => void;
};

const SwitchQuestion = ({
  title,
  text,
  checked,
  id,
  handleDelete,
  handleUpdate,
}: Props) => {
  const [conditionChecked, setConditionChecked] = React.useState(checked);
  const handleSwitchChange = (checked: boolean) => {
    setConditionChecked(checked);
    handleUpdate(id, checked);
  };

  React.useEffect(() => {
    setConditionChecked(checked);
  }, [checked]);
  return (
    <>
      <div className="Single-Switch">
        <div className="Text-wrap">
          {title == '' ? '' : <h4 className="title">{title}</h4>}
          <p className="text">{text}</p>
        </div>
        <div className="Switch-btn-wrap">
          <Switch
            defaultChecked
            checked={conditionChecked}
            onClick={handleSwitchChange}
          />
          <Button onClick={() => handleDelete(id)}>
            <CloseOutlined />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SwitchQuestion;
