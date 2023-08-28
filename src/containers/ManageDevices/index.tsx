import React, { useEffect, useState } from 'react';
import {
  sessionsService,
  deleteSessionService,
} from 'services/authservice';
import { Button, Spin } from 'antd';
import Layout from 'layouts/Layout/Layout';
import styles from './ManageDevices.module.scss';
import DeleteSessionModal from 'components/Modal/DeleteSessionModal';
import parser from 'ua-parser-js';

const ManageDevices = () => {
  const [devices, setDevices] = useState([]);
  const [spinning, setSpinning] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [signoutDevice, setSignoutDevice] = useState<any>(null);
  const [error, setError] = useState<any>();

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
    deleteSessionService(id)
      .then((res) => {
        if (res) {
          getSessionData();
        }
      })
      .catch((err) => {
        setError({
          code: err.response.status,
          message: err.response.data.details,
        });
      });
  };
  const handleCancel = () => {
    setOpen(false);
    setSignoutDevice(null);
  };
  const handleOk = () => {
    setOpen(false);
    deviceSignout(signoutDevice);
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
    <Layout defaultHeader={true} hamburger={true} title={'Manage Devices'}>
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
          title={'Enter Password to Signout Device'}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      </Spin>
    </Layout>
  );
};
export default ManageDevices;
