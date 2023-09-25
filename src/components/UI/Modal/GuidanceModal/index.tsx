import React from 'react';
import { Row, Modal, Col, Tooltip } from 'antd';
import streakStyles from 'containers/DashboardNew/DashboardNew.module.scss';
import v from 'variables.module.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
export type IProps = {
  open: boolean;
  handleClose: any;
  followUpPattern: any;
  type: string | undefined;
  guidanceData: any;
  renderData?: any;
  className?: string;
  title?: string;
};
const GuidanceModal = ({
  open,
  handleClose,
  followUpPattern,
  type,
  guidanceData
}: IProps) => {
  return (
    <Modal
      className="Guidance-Modal"
      open={open}
      zIndex={99999}
      closeIcon={
        <>
          <ArrowLeftOutlined
            style={{ fontSize: '25px', color: '#F26749', marginTop: '20px' }}
          />
        </>
      }
      footer={false}
      onCancel={handleClose}
    >
      <Row>
        <Col span={21}>
          <Row>
            <Col span={24}>
              <div className={streakStyles.TagWrap}>
                {followUpPattern &&
                  followUpPattern.map((item: any, index: number) => {
                    if (item[2] === 'purple' && type !== 'new') {
                      return (
                        <div className={streakStyles.Tag} key={index}>
                          <div
                            className={streakStyles.Streak}
                            style={{ backgroundColor: v['primary-color2'] }}
                          ></div>
                          <div className={streakStyles.StreakDay}>
                            {item[1]}
                          </div>
                        </div>
                      );
                    } else if (item[2] === 'grey') {
                      return (
                        <div className={streakStyles.Tag} key={index}>
                          <div
                            className={streakStyles.Streak}
                            style={{ backgroundColor: '#E8E8E8' }}
                          ></div>
                          <div className={streakStyles.StreakDay}>
                            {item[1]}
                          </div>
                        </div>
                      );
                    } else if (item[2] === 'orange' && type !== 'new') {
                      return (
                        <div className={streakStyles.Tag} key={index}>
                          <div
                            className={streakStyles.Streak}
                            style={{ backgroundColor: v['secondary-color2'] }}
                          ></div>
                          <div className={streakStyles.StreakDay}>
                            {item[1]}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={1}></Col>
        <Col span={2}>
          <Tooltip
            title="Following guidance suggestions regularly results in an improved streak."
            placement="bottomRight"
            overlayStyle={{ marginRight: '10px', zIndex: '100000' }}
            mouseLeaveDelay={0}
          >
            <AiOutlineQuestionCircle size={30} className={'ml-1.5 text-xl text-primary-delft-dark'} />
          </Tooltip>
        </Col>
      </Row>
      {type && type === 'inactive' && (
        <p className={'text-lg font-normal italic text-primary-cornflower-dark'}>Deactive</p>
      )}
      {type && type === 'active' && (
        <p className={'text-lg font-normal italic text-primary-cornflower-dark'}>Active</p>
      )}
      {type && <h2 className={`Title`}>{guidanceData?.name}</h2>}
      {guidanceData && (
        <div className={'font-body font-normal text-lg leading-[23px] text-black mb-[60px]'}>
          <ReactMarkdown className='prose prose-h1:text-[32px] prose-h3:text-[20px] prose-li:text-[14px] prose-p:text-[14px]' rehypePlugins={[rehypeRaw]}>
            {guidanceData?.description_md ? guidanceData?.description_md : ''}
          </ReactMarkdown>
        </div>
      )}
    </Modal>
  );
};

export default GuidanceModal;
