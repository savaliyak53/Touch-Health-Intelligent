import React from 'react';
import {Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export type IProps = {
  open: boolean;
  title: string;
  errorType: string;
  error?: any
  handleCancel: () => void;
};
const ErrorModal = ({
  open,
  title,
  errorType,
  error,
  handleCancel
}: IProps) => {
  const navigate = useNavigate();

  const handleOk = () => {
    console.log('click');
    navigate('/dashboard');
    handleCancel();
  };
  return (
    <Modal
      title={title}
      className={"Delete-Modal"}
      open={open}
      closable={errorType == 'type1' ? false : true}
      keyboard={false}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <div key='submit'>
            {errorType == 'type1' ? (
                <Button
                className={'Submit-Button'}
                onClick={handleCancel}
              >
                Close
              </Button>
            ) : (
                <Button
                className={'Submit-Button'}
                onClick={handleOk}
              >
                Go to dashboard
              </Button>
            )}
        </div>,
      ]}
    >
      <div className='Description'>
        {errorType == 'type1' ? (
            <>{`Something went wrong! Please try refreshing your page and trying again. If it still doesn't work, please let us know over on the support page.`} <br />
            {`Error ${error.code}: ${error.message}`}</>

        ) : errorType == 'type2' ? (
            <>{`Please wait a minute, then try again. If it still doesn't work, please let us know over on the support page.`}</>
        ) : (
          <>{`Something went wrong.`}</>
        )}
      </div>
    </Modal>
  );
};

export default ErrorModal;
