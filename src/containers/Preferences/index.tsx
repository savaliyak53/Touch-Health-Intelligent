import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Slider, Tooltip } from 'antd';
import './index.scss';
import { CloudDownloadOutlined } from '@ant-design/icons';
import Button from '../../components/Button';
import { preferencesService } from '../../services/authservice';
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

  const [preferences, setPreferences] = useState<any>({});
  const [yob, setYob] = useState<any>('');
  const [sex, setSex] = useState<any>('');
  const [engagement, setEngagement] = useState<number>();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormInputs>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues: {
      yob: yob,
      sex: sex,
      engagementLevel: engagement,
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const zoneVal = moment()
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format('Z');
    const preferenceData = {
      sex: data.sex,
      yob: data.yob,
      preferences: {
        engagement_level: data.engagementLevel ?? 0,
        timezone: zoneVal,
      },
    };

    setIsLoading(true);
    preferencesService(preferenceData, userId)
      .then((preferencesResponse) => {
        setIsLoading(false);
        toast.success('Preferences submitted');
        if (isEmpty(preferences)) {
          handleRedirect();
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(
          `${error.response?.data?.title} Please check values and try again.`
        );
      });
  };
  const handleRedirect = () => {
    navigate(`/conditions`);
  };

  const getUserInfo = (userId: string | null | undefined) => {
    getUser(userId)
      .then((response: any) => {
        if (response?.data?.preferences?.timezone) {
          setPreferences(response.data.preferences);
          setYob(response.data.yob);
          setSex(response.data.sex);
          setEngagement(response.data.preferences.engagement_level);
          reset({
            yob: response.data.yob,
            sex: response.data.sex,
            engagementLevel: response.data.preferences.engagement_level,
          });
          setloading(false);
        }
      })
      .catch((error) => {
        toast('Unknown error');
      });
  };

  const isEmpty = (obj: any) => {
    for (const x in obj) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    let deferredPrompt: BeforeInstallPromptEvent | null;
    const installApp = document.getElementById('installApp');

    window.addEventListener('beforeinstallprompt', (e) => {
    if(installApp != null){
      installApp.style.display = 'initial'
      }
      deferredPrompt = e;
    });

    installApp?.addEventListener('click', async () => {
      if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          deferredPrompt = null;
        location.reload()
        }
      }
    });

    const userId = localStorage.getItem('userId');
    setloading(true);
    getUserInfo(userId);
  }, []);

  return (
    <Layout
      defaultHeader={true}
      hamburger={isEmpty(preferences) ? false : true}
    >
      <div className="Content-wrap Pref">
        <h2 className="Pref-title">Preferences</h2>
        <div
          className="Download"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            marginBottom: '30px',
          }}
        >
          <button
            style={{ border: 'none', background: 'none', display: 'none' }}
            id="installApp"
            className="Download-btn"
          >
              <h5 style={{ float: 'left', cursor: 'pointer'}}>You can also install this app</h5>
            &nbsp;
            <CloudDownloadOutlined
              className="Download-icon"
              style={{
                color: '#3a4a7e',
                float: 'right',
                fontSize: '20px',
                marginLeft: '3px',
                cursor: 'pointer'
              }}
            />
          </button>
        </div>{' '}
        <form onSubmit={handleSubmit(onSubmit)} className="Preferences-form">
          <div className="Question">
            <Tooltip
              title="The more time you give your health assistant, the better it gets to know your personal health, and the better it will guide you to optimal health."
              placement="topRight"
              overlayStyle={{ maxWidth: '350px' }}
              color="blue"
              visible={showTooltip}
              mouseLeaveDelay={0}
            >
              <h3
                className="Question-title"
                onMouseEnter={() => {
                  setShowTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              >
                How much communication with your AI health assistant would you
                like?
              </h3>
            </Tooltip>
            <h5>
              Tip 1: More engagement early on reduces the time it takes to
              discover your health pathways. We recommend starting high, and
              once your health pathways are detected adjust to lower values to
              suit you.
            </h5>
            <h5>
              Tip 2: By enabling integrations with your smart wearables, your AI
              health assistant gets to know you faster and requires less
              communication with you.
            </h5>

            <br />

            {engagement ? (
              <Controller
                control={control}
                name="engagementLevel"
                rules={{
                  required: 'Please Select a check-in value',
                }}
                defaultValue={engagement && engagement}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Slider
                      className="Pref-slider"
                      id="engagementLevel"
                      value={value}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={onChange}
                      tooltipVisible={false}
                    />

                    <div className="Slider-range">
                      <div className="flex-container">
                        <span>Very little</span> <br />
                        <span> (Low accuracy and minimal navigation)</span>
                      </div>
                      <div className="flex-container">
                        <span>Medium</span> <br />
                        <span> (Adaptive and able to navigate)</span>
                      </div>
                      <div className="flex-container">
                        <span>Complete</span> <br />
                        <span> (High accuracy and reactive navigation)</span>
                      </div>
                    </div>
                  </>
                )}
              />
            ) : (
              <Controller
                control={control}
                name="engagementLevel"
                rules={{
                  required: 'Please Select a check-in value',
                }}
                defaultValue={0}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Slider
                      className="Pref-slider"
                      id="engagementLevel"
                      value={value}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={onChange}
                      tooltipVisible={false}
                    />
                    <div className="Slider-range">
                      <div className="flex-container">
                        <span>Very little</span> <br />
                        <span> (Low accuracy and minimal navigation)</span>
                      </div>
                      <div className="flex-container">
                        <span>Medium</span> <br />
                        <span> (Adaptive and able to navigate)</span>
                      </div>
                      <div className="flex-container">
                        <span>Complete</span> <br />
                        <span> (High accuracy and reactive navigation)</span>
                      </div>
                    </div>
                  </>
                )}
              />
            )}
            <p className="Preferences-form-error">
              {errors.engagementLevel?.message}
            </p>
          </div>
          {yob ? (
            <div className="Question">
              <h3 className="Question-title">What is your year of birth?</h3>
              <Controller
                control={control}
                name="yob"
                defaultValue={yob}
                rules={{
                  required: 'Please Select an year',
                  validate: (value) => {
                    return value > 2006 ? 'You must older than 16' : true;
                  },
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <DatePicker
                    disabled={true}
                    picker="year"
                    format="YYYY"
                    value={moment(yob, 'YYYY')}
                    className="Date-Select"
                  />
                )}
              />

              <p className="Preferences-form-error">{errors.yob?.message}</p>
            </div>
          ) : (
            <div className="Question">
              <h3 className="Question-title">What is your year of birth?</h3>
              <Controller
                control={control}
                name="yob"
                rules={{
                  required: 'Please Select an year',
                  validate: (value) => {
                    return value > 2006 ? 'You must older than 16' : true;
                  },
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <DatePicker
                    onChange={(selectedValue, selectedValueString) =>
                      onChange(selectedValueString)
                    }
                    picker="year"
                    format="YYYY"
                    className="Date-Select"
                  />
                )}
              />

              <p className="Preferences-form-error">{errors.yob?.message}</p>
            </div>
          )}

          {sex ? (
            <div className="Question">
              <h3 className="Question-title">
                Assigned sex at the time of birth
              </h3>
              <Controller
                control={control}
                name="sex"
                defaultValue={sex && sex}
                rules={{ required: 'Please Select one' }}
                render={({ field: { value } }) => (
                  <Radio.Group value={value} disabled={true}>
                    <Space direction="vertical">
                      <Radio value="male" className="radio-input">
                        Male
                      </Radio>
                      <Radio value="female" className="radio-input">
                        Female
                      </Radio>
                      <Radio value="x" className="radio-input">
                        Prefer not to say
                      </Radio>
                    </Space>
                  </Radio.Group>
                )}
              />

              <p className="Preferences-form-error">{errors.sex?.message}</p>
            </div>
          ) : (
            <div className="Question">
              <h3 className="Question-title">
                Assigned sex at the time of birth
              </h3>
              <Controller
                control={control}
                name="sex"
                rules={{ required: 'Please Select one' }}
                render={({ field: { onChange, value } }) => (
                  <Radio.Group value={value} onChange={onChange}>
                    <Space direction="vertical">
                      <Radio value="male" className="radio-input">
                        Male
                      </Radio>
                      <Radio value="female" className="radio-input">
                        Female
                      </Radio>
                      <Radio value="x" className="radio-input">
                        Prefer not to say
                      </Radio>
                    </Space>
                  </Radio.Group>
                )}
              />

              <p className="Preferences-form-error">{errors.sex?.message}</p>
            </div>
          )}

          {isEmpty(preferences) ? (
            <Button
              className="Pref-btn btn"
              loading={isLoading}
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Save and Next
            </Button>
          ) : (
            <div className="button-group">
              <Button
                className="Cancel-post-btn btn"
                onClick={() => {
                  navigate('/dashboard');
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="Pref-post-btn btn"
                loading={isLoading}
                // disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Preferences;
