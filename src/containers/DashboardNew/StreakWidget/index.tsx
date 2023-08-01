import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import styles from '../DashboardNew.module.scss';
import { tooltipContent } from '../../../constants';
interface IProps {
  streakCount: number | undefined;
  elementStreak: any;
}
const StreakWidget = ({ streakCount, elementStreak }: IProps) => {
  return (
    <>
      <Row className={styles.StreakInfo}>
        <Col>
          <Row>
            <div className={`Heading ${styles.StreakTitle}`}>Streak</div>
            <Tooltip
              title={tooltipContent.streakText}
              placement="bottomRight"
              overlayStyle={{ marginRight: '10px' }}
              color="blue"
              mouseLeaveDelay={0}
            >
              <img src="/assets/icons/info-icon.svg" alt="info" />
            </Tooltip>
          </Row>
        </Col>
        <Col>
          <Row>
            {streakCount && streakCount > 0 ? (
              <>
                <div className={`${styles.StreakCount}`}>{streakCount}</div>
                <div className={styles.Days}>days</div>
              </>
            ) : (
              <div className="Heading">No current streak</div>
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={styles.TagWrap}>
            {elementStreak &&
              elementStreak.map((item: any, index: number) => {
                if (item[2] === 'purple') {
                  return (
                    <div className={styles.Tag} key={index}>
                      <div className={styles.StreakBlue}></div>
                      <div className={styles.StreakDay}>{item[1]}</div>
                    </div>
                  );
                } else if (item[2] === 'grey') {
                  return (
                    <div className={styles.Tag} key={index}>
                      <div className={styles.StreakGrey}></div>
                      <div className={styles.StreakDay}>{item[1]}</div>
                    </div>
                  );
                } else if (item[2] === 'orange') {
                  return (
                    <div className={styles.Tag} key={index}>
                      <div className={styles.StreakPeach}></div>
                      <div className={styles.StreakDay}>{item[1]}</div>
                    </div>
                  );
                }
              })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StreakWidget;
