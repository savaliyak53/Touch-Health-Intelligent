import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Button, Spin, Input } from 'antd';
import styles from './Preferences.module.scss';
import { CloudDownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  getIntegrationStatus,
  getPreference,
  updatePreference,
} from 'services/authservice';
import Layout from 'layouts/Layout/Layout';
import moment from 'moment';
import 'moment-timezone';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
const Preferences = () => {
  const [loading, setloading] = useState(false);
  const [enable, setEnabled] = useState(false);
  const [username, setUsername] = useState<any>('');
  const [checked, setChecked] = useState<boolean>();
  const [yob, setYob] = useState<any>('');
  const [sex, setSex] = useState<any>('');
  const [spinning, setSpinning] = useState<boolean>(true);
  const [userId, setUserId] = useState<any>('');
  const navigate = useNavigate();
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [error, setError] = useState<any>();

  useEffect(() => {
    let deferredPrompt: BeforeInstallPromptEvent | null;
    const installApp = document.getElementById('installApp');

    window.addEventListener('beforeinstallprompt', (e) => {
      if (installApp != null) {
        installApp.style.display = 'initial';
      }
      deferredPrompt = e;
    });

    installApp?.addEventListener('click', async () => {
      if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          deferredPrompt = null;
          location.reload();
        }
      }
    });
    const id = context?.user;
    setUserId(id);
    setSpinning(true);
    setloading(true);
    getIntegrationStatusService();
    getUserInfo(userId);
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const getUserInfo = (userId: string | null | undefined) => {
    getPreference()
      .then((response: any) => {
        if (response?.data) {
          setYob(response.data.yob);
          setSex(response.data.sex);
          setUsername(response.data.username);
          setloading(false);
        }
        setSpinning(false);
      })
      .catch((error) => {
         setSpinning(false);
        setError({code: error.response.status, message: error.response.data.details })
      });
  };
  const getIntegrationStatusService = () => {
    getIntegrationStatus()
      .then((response: any) => {
        if (response?.data) {
          setChecked(response.data.enabled);
        }
      })
      .catch((error) => {
        setSpinning(false);
        setError({code: error.response.status, message: error.response.data.details})
      });
  };
  const handleNext = () => {
    if (username !== '') {
      updatePreference({
        username : username
        })
      .then(res => {
        if(res.data)
        navigate('/dashboard')
      })
      .catch((error) => {
        setError({code: error.response.status, message: error.response.data.details})
      });
    } else {
      setError({code: 400, message: "Username cannot be empty!"})
    }
  };
  return (
    <Layout defaultHeader={true} hamburger={true} title={'Preferences'}>
      <Spin spinning={spinning}>
        <div className={`${styles['Pref-wrap']} mt-12`}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              marginBottom: '10px',
            }}
          >
            <button
              style={{ border: 'none', background: 'none', display: 'none' }}
              id="installApp"
            >
              <h5 style={{ float: 'left', cursor: 'pointer' }}>
                You can also install this app
              </h5>
              &nbsp;
              <CloudDownloadOutlined
                className="Download-icon"
                style={{
                  color: '#3a4a7e',
                  float: 'right',
                  fontSize: '20px',
                  marginLeft: '3px',
                  cursor: 'pointer',
                }}
              />
            </button>
          </div>
          <br />
          <div>
            {sex && (
              <div>
                <h3 className={'Heading Heading-color1 flex flex-row items-start'}>
                  Biological Sex
                  <Tooltip
                    title={
                      'This is your sex assigned at birth, and may not align with your current sex and gender identify.'
                    }
                    placement="bottomRight"
                    // overlayStyle={{ marginRight: '10px' }}
                    mouseLeaveDelay={0}
                  >
                    <AiOutlineQuestionCircle
                      size={30}
                      className="question-help ml-2 mb-2"
                    />
                  </Tooltip>
                </h3>
                <Button className="Pref-post-btn" disabled={true}>
                  {sex.charAt(0).toUpperCase() + sex.slice(1)}
                </Button>
              </div>
            )}
            {yob && (
              <div>
                <h3 className={'Heading Heading-color1 flex flex-row items-start'}>
                  Approximate Age
                  <Tooltip
                    title={
                      'This is your approximate age. Since we do not collect your date of birth, this may not align with your actual age.'
                    }
                    placement="bottomRight"
                    // overlayStyle={{ marginRight: '10px' }}
                    mouseLeaveDelay={0}
                  >
                    <AiOutlineQuestionCircle
                      size={30}
                      className="question-help ml-2 mb-2"
                    />
                  </Tooltip>
                </h3>
                <Button className="Pref-post-btn" disabled={true}>
                  {parseInt(moment().format('YYYY')) - yob}
                </Button>
              </div>
            )}
            <div>
              <h3 className={'Heading Heading-color1 flex flex-row items-start'}>
                Username
                <Tooltip
                  title={
                    'This is your username. You can set it to anything you want to be called, like "JazzyCat99 💃😽".'
                  }
                  placement="bottomRight"
                  overlayStyle={{ marginRight: '10px' }}
                  mouseLeaveDelay={0}
                >
                  <AiOutlineQuestionCircle
                    size={30}
                    className="question-help ml-2 mb-2"
                  />
                </Tooltip>
              </h3>
              <div className={'Pref-username-input text-left'}>
                <Input
                  type="text"
                  status={username.length > 24 ? 'error' : ''}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onClick={() => setEnabled(true)}
                />
              </div>
            </div>
            {username.length > 24 && (
              <span className={styles['Username-error-msg']}>
                <InfoCircleOutlined /> Username cannot be longer than 24
                characters.
              </span>
            )}

            <div>
              <Button
                className={`rounded-full h-auto p-5 pl-14 pr-14 bg-primary-delft-dark text-white text-lg leading-6 font-normal border-none m-auto mt-5 flex justify-center whitespace-pre-line w-full hover:bg-buttongradient hover:text-white`}
                onClick={() => navigate('/manage-devices')}
              >
                {'Manage Devices'}
              </Button>
            </div>
            {enable && (
              <div className={styles.TermsBtnWrap}>
                <Button
                  className={'Submit-Button'}
                  onClick={handleNext}
                  disabled={username.length > 24}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </Spin>
    </Layout>
  );
};

export default Preferences;
