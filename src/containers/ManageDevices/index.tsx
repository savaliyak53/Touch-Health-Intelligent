import React, { useEffect, useState } from 'react';
import {
  sessionsService,
  deleteSessionService,
} from 'services/authservice';
import { Button, Spin } from 'antd';
import Layout from 'layouts/Layout';
import styles from './ManageDevices.module.scss';
import DeleteSessionModal from 'components/Modal/DeleteSessionModal';
import parser from 'ua-parser-js';
import {useNavigate} from "react-router-dom";
import TouchButton from "../../components/TouchButton";
import TouchModal from "../../components/Modal/TouchModal";

const ManageDevices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [spinning, setSpinning] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [signoutDevice, setSignoutDevice] = useState<any>(null);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<any>();
  const [errorPassword, setErrorPassword] = useState<any>();
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  const getSessionData = () => {
    sessionsService()
      .then((res: any) => {
        if (res.data) {
          setSpinning(false);
          setDevices(res.data);
        }
      })
      .catch((err) => {
        setError({
          code: err.response.status,
          message: err.response.data.details,
        });
      });
  };

  const deviceSignout = (id: string) => {
    deleteSessionService(id, {password})
      .then((res) => {
        if (res) {
          getSessionData();
        }
      })
      .catch((err) => {
        setOpenErrorModal(true);
        setErrorPassword({
          code: err.response.status,
          message: err.response.data.details,
        });
      });
  };
  const handleCancel = () => {
    setOpen(false);
    setSignoutDevice(null);
    setPassword('');
  };
  const handleOk = () => {
    setOpen(false);
    if (password) {
      deviceSignout(signoutDevice);
      setPassword('');
    }
  };

  function extractDeviceName(userAgent: string) {
    const ua = parser(userAgent);
    return `${ua.device.vendor ?? ''} ${ua.device.model ?? ''} ${
      ua.os.name ?? ''
    } ${ua.browser.name ?? ''}`;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getSessionData();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Layout whitBackArrow={true} onBack={() => navigate('/preferences')} defaultHeader={true} hamburger={true} title={'Manage Devices'}>
      <Spin spinning={spinning}>
        <div>
          {devices &&
            devices.map((device: any, key: any) => (
              <div className={styles['Device-Container']} key={key}>
                <div className={`Heading ${styles['Device-Name']}`}>
                  {extractDeviceName(device.user_agent)}
                </div>
                <Button
                  className="Submit-Button"
                  onClick={() => {
                    setSignoutDevice(device.id);
                    setOpen(true);
                  }}
                >
                  Signout
                </Button>
              </div>
            ))}
        </div>
        <DeleteSessionModal
          open={open}
          handleCancel={handleCancel}
          handleOk={handleOk}
          password={password}
          setPassword={setPassword}
        />
        <TouchModal setClose={setOpenErrorModal} isOpen={openErrorModal}>
          <div className='flex flex-col w-full my-[50px] px-[20px]'>
            <h3 className='text-[18px] mb-10 leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
              {errorPassword.code === 401 ? 'Wrong password' : 'Error'}
            </h3>
            <div className='text-3 text-oldBurgundy leading-[23px] text-left'>
              {errorPassword && errorPassword.message ? errorPassword.message : ''}
            </div>
          </div>
          <div className='mx-[25px] mb-[33px] px-10'>
            <TouchButton type={'default'} onClick={() => setOpenErrorModal(false)}>
              OK
            </TouchButton>
          </div>
        </TouchModal>
      </Spin>
    </Layout>
  );
};
export default ManageDevices;
