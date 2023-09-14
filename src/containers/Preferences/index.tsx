import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Button, Spin } from 'antd';
import styles from './Preferences.module.scss';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  getIntegrationStatus,
  getPreference,
  updatePreference,
  preferencesService,
  invokeInteractionServiceByType,
} from 'services/authservice';
import Layout from 'layouts/Layout';
import moment from 'moment';
import 'moment-timezone';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import DeleteModal from 'components/UI/Modal/DeleteDataModal';
import { deleteAllData } from 'services/goalsService';
import { toast } from 'react-toastify';
import useLocalStorage from 'hooks/useLocalStorage';
import TouchInput from 'components/UI/TouchInput';
import InformIcon from 'components/Icons/InformIcon';

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

interface LocationState {
  state: {
    refId: string;
    redirect: boolean;
  };
}
const Preferences = () => {
  const [loading, setloading] = useState(false);
  const [enable, setEnabled] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [previousUsername, setPreviousUsername] = useState<any>('');
  const [checked, setChecked] = useState<boolean>();
  const [yob, setYob] = useState<any>('');
  const [sex, setSex] = useState<any>('');
  const [spinning, setSpinning] = useState<boolean>(true);
  const [userId, setUserId] = useState<any>('');
  const navigate = useNavigate();
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [error, setError] = useState<any>();
  const [loc, setLocation] = useState<LocationState>();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [value, setIsOnboarding] = useLocalStorage("isOnboarding");
  const [usernameError, setUsernameError] = useState<string>('');

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

  useEffect(() => {
    setEnabled(username !== previousUsername);
  }, [username])

  const getUserInfo = (userId: string | null | undefined) => {
    getPreference()
      .then((response: any) => {
        if (response?.data) {
          setYob(response.data.yob);
          setSex(response.data.sex);
          setPreviousUsername(response.data.username);
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
    if (username) {
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

  const handleSetUserStatus = () => {
    const userId = context?.user;
    preferencesService(
      {
        signup_status: 'onboarding',
      },
      userId
    )
      .then((preferencesResponse) => {
        if (preferencesResponse) {
          //after successful subscription initiate onboarding interaction
          invokeInteractionServiceByType({type: 'onboarding' })
            .then((response: any) => {
              if (response) {
                navigate('/questionnaire');
              } else {
                navigate('/');
              }
            })
            .catch((error) => {
              setError({
                code: error.response.status,
                message: error.response.data.details,
              });
            });
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const checkErrorUsername = (value: string) => {
    if (!value) {
      setUsernameError('Username is required.')
      return;
    } else if (value.length > 24) {
      setUsernameError('Username can have maximum 24 characters.')
      return;
    }
    setUsernameError('')
  }

  const handleChangeUserName = (value: string) => {
    setUsername(value);
    checkErrorUsername(value);
  }

  const handleDeleteModal = () => {
    setShowCancelModal(false);
  };
  const removeUserData = () => {
    deleteAllData()
      .then((res) => {
        setIsOnboarding(true);
        toast('User data deleted');
        handleSetUserStatus();
      })
      .catch((err) => {
        setError({
          code: err.response.status,
          message: err.response.data.details,
        });
      });
  };

  return (
    <Layout defaultHeader={true} hamburger={true} title={'Preferences'}>
      {spinning ? <Spin spinning={spinning} className='mt-5' /> : (
        <div className={`${styles['Pref-wrap']} mt-5`}>
          {/*<div*/}
          {/*  style={{*/}
          {/*    alignItems: 'center',*/}
          {/*    justifyContent: 'start',*/}
          {/*    marginBottom: '10px',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <button*/}
          {/*    style={{ border: 'none', background: 'none', display: 'none' }}*/}
          {/*    id="installApp"*/}
          {/*  >*/}
          {/*    <h5 style={{ float: 'left', cursor: 'pointer' }}>*/}
          {/*      You can also install this app*/}
          {/*    </h5>*/}
          {/*    &nbsp;*/}
          {/*    <CloudDownloadOutlined*/}
          {/*      className="Download-icon"*/}
          {/*      style={{*/}
          {/*        color: '#3a4a7e',*/}
          {/*        float: 'right',*/}
          {/*        fontSize: '20px',*/}
          {/*        marginLeft: '3px',*/}
          {/*        cursor: 'pointer',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </button>*/}
          {/*</div>*/}
          {/*<br />*/}
          <div>
            {sex && (
              <div className='max-w-[330px]'>
                <h3 className='font-tilt-warp font-normal text-[18px] leading-[36px] text-primary-high-dark flex flex-row items-start'>
                  Biological Sex
                </h3>
                <TouchInput
                  className='my-3'
                  type='text'
                  disabledMessage='This is your sex assigned at birth, and may not align with your current sex and gender identify.'
                  value={sex.charAt(0).toUpperCase() + sex.slice(1)}
                  isDisabled={true} />
              </div>
            )}
            {yob && (
              <div className='max-w-[330px]'>
                <h3 className='font-tilt-warp font-normal text-[18px] leading-[36px] text-primary-high-dark flex flex-row items-start'>
                  Approximate Age
                </h3>
                <TouchInput
                  className='my-3'
                  disabledMessage='This is your approximate age. Since we do not collect your date of birth, this may not align with your actual age.'
                  isDisabled={true}
                  type='text'
                  value={parseInt(moment().format('YYYY')) - yob} />
              </div>
            )}
            <div className='max-w-[330px]'>
              <h3 className='font-tilt-warp font-normal text-[18px] leading-[36px] text-primary-high-dark flex flex-row items-start'>
                Username
                <Tooltip
                  title='This is your username. You can set it to anything you want to be called, like "JazzyCat99 💃😽".'
                  placement="bottomRight"
                  overlayStyle={{ marginRight: '10px' }}
                  mouseLeaveDelay={0}
                >
                  <span>
                    <InformIcon  className="ml-2 cursor-pointer" />
                  </span>
                </Tooltip>
              </h3>
                <TouchInput
                  className='my-3'
                  errorMessage={usernameError}
                  resetError={setUsernameError}
                  checkError={checkErrorUsername}
                  type='text'
                  value={username}
                  onChange={(e) => handleChangeUserName(e.target.value)} />
            </div>
            <div>
              <h3
                className={'Heading Heading-color1 flex flex-row items-start'}
              >
                Data Use
                <Tooltip
                  className={styles['TooltipIcon']}
                  title={
                    'This deletes all your data, setting your entire health profile in the Touch Health Assistant back to 0. We will retain your basic account information but all your data with the app so far will be deleted.'
                  }
                  placement="bottomRight"
                  overlayStyle={{ marginRight: '10px' }}
                  mouseLeaveDelay={0}
                >
                  <span>
                    <InformIcon  className="ml-2 cursor-pointer" />
                  </span>
                </Tooltip>
              </h3>
              <Button
                className={`Pref-post-btn ${
                  loc?.state.redirect ? 'Pref-post-btn-disabled' : ''
                } ${styles['Data-dlt-btn']}`}
                onClick={() => setShowCancelModal(true)}
                disabled={loc?.state.redirect}
              >
                Delete all my data
              </Button>
              <DeleteModal
                open={showCancelModal}
                handleCancel={handleDeleteModal}
                handleOk={() => removeUserData()}>
                <div className='text-3 text-oldBurgundy leading-[23px]'>
                  By deleting your data, your entire health profile in the
                  Touch Health Assistant will cease to exist. No data will be
                  retained, and you will be sent back to the beginning as if
                  you just started. This is irreversible, proceed with
                  caution.
                </div>
              </DeleteModal>
            <div>
              <Button
                className={`rounded-full sm:mb-0 mb-5 h-auto p-5 pl-14 pr-14 bg-primary-delft-dark text-white text-lg leading-6 font-normal border-none m-auto mt-5 flex justify-center whitespace-pre-line w-full hover:bg-buttongradient hover:text-white`}
                onClick={() => navigate('/manage-devices')}
              >
                {'Manage Devices'}
              </Button>
            </div>
            {enable && (
                <Button
                  className={`rounded-full h-auto p-5 pl-14 pr-14 bg-primary-delft-dark text-white text-lg leading-6 font-normal border-none m-auto mt-5 mb-5 flex justify-center whitespace-pre-line w-full hover:bg-buttongradient hover:text-white`}
                  onClick={handleNext}
                  disabled={username.length > 24 || !username}
                >
                  Save
                </Button>
            )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Preferences;
