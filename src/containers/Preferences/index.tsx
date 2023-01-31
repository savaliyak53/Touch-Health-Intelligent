import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Slider, Tooltip, Button, Spin, Switch } from 'antd';
import styles from './Preferences.module.scss';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  getGoogleCode,
  revokeGoogleFit,
  getIntegrationStatus,
  getPreference,
} from '../../services/authservice';
import { toast } from 'react-toastify';
import Layout from '../../layouts/Layout/Layout';
import { Radio, Space, DatePicker } from 'antd';
import moment from 'moment';
import 'moment-timezone';
import { getUser } from '../../services/authservice';

type IFormInputs = {
  engagementLevel: number;
  yob: number;
  sex: string;
};
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
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setloading] = useState(false);

  const [username, setUsername] = useState<any>('');
  const [checked, setChecked] = useState<boolean>();

  const [yob, setYob] = useState<any>('');
  const [sex, setSex] = useState<any>('');
  const [spinning, setSpinning] = useState<boolean>(true);
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

    const userId = localStorage.getItem('userId');
    setSpinning(true);
    setloading(true);
    getIntegrationStatusService();
    getUserInfo(userId);
  }, []);


  const getUserInfo = (userId: string | null | undefined) => {
    getPreference()
      .then((response: any) => {
        if (response?.data) {
          setYob(response.data.yob);
          setSex(response.data.sex);
          setloading(false);
        }
        setSpinning(false);
      })
      .catch((error) => {
        toast('Unknown error');
        setSpinning(false);
      });
      getUser(userId)
        .then((res: any) => {
          if(res.data) {
            console.log(res.data.name);
            setUsername(res.data.name)
          }
        })
        .catch((error) => {
          toast('Unknown error');
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
        toast('Unknown error');
        setSpinning(false);
      });
  };
  const handleClick = (checked: any) => {
    if (checked) {
      getGoogleCode().then((res) => {
        createAuthLink(res);
      });
    } else {
      revokeCredentials();
    }
  };
  const revokeCredentials = () => {
    revokeGoogleFit().then((res) => {
      if (res.data.message) {
        setChecked(false);
        toast.success('Google fit disabled');
      }
    });
  };
  const createAuthLink = (response: any) => {
    setChecked(true);
    const redirect_uri = `${process.env.REACT_APP_FRONTEND}auth/google/code`;
    const params = new URLSearchParams({
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      redirect_uri: redirect_uri,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/fitness.activity.read',
        'https://www.googleapis.com/auth/fitness.location.read',
        'https://www.googleapis.com/auth/fitness.nutrition.read',
      ]
        .join(' ')
        .trim(),
      access_type: 'offline',
      state: JSON.stringify({
        sessionId: response.data.sessionId,
        redirect_uri: redirect_uri,
      }),
      include_granted_scopes: 'true',
      prompt: 'consent select_account',
    });
    const url = `${
      process.env.REACT_APP_GOOGLE_FIT_OAUTH_ENDPOINT
    }?${params.toString()}`;

    visitLink(url);
  };
  const visitLink = (url: any) => {
    window.location.href = url;
  };
  const text = <span>prompt text</span>;

  return (
    <Layout defaultHeader={true} hamburger={true}>
      <Spin spinning={spinning}>
        <div className={`Content-wrap ${styles['Pref']}`}>
          <h2 className={styles['Pref-title']}>Preferences</h2>
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
          <div >
                <h3 className={styles['Question-title']}>Integrations</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '25px', marginBottom: '24px' }}>
            <img 
                src={'assets/icons/GoogleFit_Icon_Color_RGB.png'} 
                height={50}
                width={50}
              />
            Google Fit
            {checked === undefined ? (
              <Spin spinning={checked === undefined ? true : false} />
            ) : (
              <div className="Switch-btn-wrap">
                <Switch
                  checked={checked}
                  onChange={handleClick}
                />
              </div>
            )}
          </div>

          <div>
            <div className={styles['Question']}>
              <h3 className={styles['Question-title']} style={{color: '#A5A5A5'}}>
              Here is the google fit description about the integration and data usage
              </h3>
            </div>
            <div>
              <h3 className={styles['Question-title']} style={{fontSize: '22px'}}>
                Data Use               
                <AiOutlineQuestionCircle
                    size={30}
                    className="question-help"
                    style={{marginLeft: '10px'}}
                  />
              </h3>

              <Button className={`Pref-post-btn ${styles['Data-dlt-btn']}`}>  Delete all my data</Button>

            </div>
            {sex && (
              <div >
                <h3 className={styles['Question-title']} style={{fontSize: '22px'}}>
                  Biological Sex
                  <AiOutlineQuestionCircle
                      size={30}
                      className="question-help"
                      style={{marginLeft: '10px'}}
                    />
                </h3>
                <Button className='Pref-post-btn' disabled={true}>{sex.charAt(0).toUpperCase() + sex.slice(1)}</Button>
              </div>
            )}
            {yob && (
              <div>
                <h3 className={styles['Question-title']} style={{fontSize: '22px'}}>
                  Age
                </h3>
                <Button className='Pref-post-btn' disabled={true}>{parseInt(moment().format('YYYY')) - yob}</Button>
              </div>
            )}
            {username !== '' && (
              <div>
                <h3 className={styles['Question-title']} style={{fontSize: '22px'}}>
                  Username
                </h3>
                <Button className='Pref-username-btn'>{username}</Button>
              </div>
            )}
          </div>
        </div>
      </Spin>
    </Layout>
  );
};

export default Preferences;
