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

  const handleClose = () => {
    const userId: string | null = localStorage.getItem('userId');
    const expiration: string | null = localStorage.getItem('expiration');
    const now: number = Math.floor(Date.now() / 1000);

    if (userId && expiration && parseInt(expiration) > now) {
      navigate('/dashboard');
      handleCancel();
      return;
    }
    localStorage.removeItem('token');
    handleCancel();
    window.location.assign('/login');
  };


  const handleUnauthorized = () => {
    handleCancel();
    window.location.assign('/login');
  };
  return (
    <Modal
      title={title}
      className={"Delete-Modal"}
      open={open}
      closable={
        errorType == 'type1' || errorType == 'type0' || errorType == 'type401'
          ? false
          : true
      }
      keyboard={false}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <div key='submit'>
            {errorType == 'type0' ? (
                <Button
                className={'Submit-Button'}
                onClick={handleUnauthorized}
              >
                Ok
              </Button>
            ) :
            errorType == 'type401' ? (
              <Button
              className={'Submit-Button'}
              onClick={handleUnauthorized}>
                Login
              </Button>
            ) :
            errorType == 'type1' ? (
              error.message === 'Daily SMS limit reached' || error.message === 'Invalid username or password.' ? (
                <Button className={'Submit-Button'} onClick={handleUnauthorized}>
                  Close
                </Button>
              ) : (
                <Button className={'Submit-Button'} onClick={handleClose}>
                  Go to dashboard
                </Button>
              )
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
        {errorType == 'type0' ? (
            <>{`Your session has expired. Please log in to continue.`} <br /> </>
        ) :
        errorType == 'type401' ? (
          <>{`Please log in to continue.`} <br /> </>
        ) : errorType == 'type1' ? (
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
