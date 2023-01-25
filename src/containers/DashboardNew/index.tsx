import Layout from '../../layouts/Layout/Layout'
import React from 'react'
import styles from './DashboardNew.module.scss'
import {Row, Col, Typography, Tooltip, Button, Progress } from 'antd'
import { AiOutlineQuestionCircle, AiOutlinePlus } from 'react-icons/ai';

const DashboardNew = () => {

  return (
    <Layout defaultHeader={true} hamburger={true} dashboard={false}>
      <div>
        <Typography style={{color:'#6A2C70'}} className={styles.Title}>No current streak</Typography>
        <Row>
          <Col span={21}>
            <Row>
              <Col span={24}>
                <div className={styles.TagWrap}>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>M</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>T</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>W</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>T</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#F08A5D'}}></div>
                    <div className={styles.StreakDay}>F</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>S</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#F08A5D'}}></div>
                    <div className={styles.StreakDay}>S</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#F08A5D'}}></div>
                    <div className={styles.StreakDay}>M</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>T</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>W</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>T</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>F</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#6A2C70'}}></div>
                    <div className={styles.StreakDay}>S</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                    <div className={styles.StreakDay}>S</div>
                  </div>
                  <div className={styles.Tag}>
                    <div className={styles.Streak} style={{backgroundColor:'#6A2C70'}}></div>
                    <div className={styles.StreakDay}>M</div>
                  </div>
                  
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={1}>
          </Col>
          <Col span={2}>
            <Tooltip
              title='Any text here'
              placement="bottomRight"
              overlayStyle={{ marginRight: '10px' }}
              color="blue"
              mouseLeaveDelay={0}
            >
              <AiOutlineQuestionCircle
                size={35}
                className={styles.Tooltip}
              />
            </Tooltip>
          </Col>
        </Row>
        {/* Goals Detail Head + Add new Goal */}
        <Row>
          <Col span={24}>
            <div className={styles.GoalsHead}>
              <Typography className={styles.GoalsHeadTitle} style={{color:'#B83B5E'}}>Health Goals</Typography>
              <Button className={styles.GoalsHeadButton}>+</Button>
            </div>
          </Col>
        </Row>
        {/* Goals In Detail */}
        <Row>
          <Col span={24}>
            <div className={styles.Goal}>
              <div className={styles.GoalHeadWrap}>
                <Typography className={styles.GoalTitle} style={{color:'#6A2C70'}}>Optimal Movement</Typography>
                <Typography className={styles.GoalCount} style={{color:'#6A2C70'}}>40</Typography>
              </div>
              <div className={styles.GoalBarWrap}>
                <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>G</Typography>
                <Progress percent={50} strokeColor="#6A2C70" strokeWidth={15} showInfo={false}/>
              </div>
              <div className={styles.GoalBarWrap}>
                <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>D</Typography>
                <Progress percent={75} strokeColor="#F08A5D" strokeWidth={15} showInfo={false}/>
              </div>
            </div>
          </Col>
        </Row>
        {/* Goals In Detail */}
        <Row>
          <Col span={24}>
            <div className={styles.Goal}>
              <div className={styles.GoalHeadWrap}>
                <Typography className={styles.GoalTitle} style={{color:'#6A2C70'}}>Optimal Nutrition</Typography>
                <Typography className={styles.GoalCount} style={{color:'#6A2C70'}}>79</Typography>
              </div>
              <div className={styles.GoalBarWrap}>
                <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>G</Typography>
                <Progress percent={75} strokeColor="#6A2C70" strokeWidth={15} showInfo={false}/>
              </div>
              <div className={styles.GoalBarWrap}>
                <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>D</Typography>
                <Progress percent={35} strokeColor="#F08A5D" strokeWidth={15} showInfo={false}/>
              </div>
            </div>
          </Col>
        </Row>
        {/* Goals In Detail */}
        <Row>
          <Col span={24}>
            <div className={styles.Goal}>
              <div className={styles.GoalHeadWrap}>
                <Typography className={styles.GoalTitle} style={{color:'#6A2C70'}}>Optimal Nutrition</Typography>
                <Typography className={styles.GoalCount} style={{color:'#6A2C70'}}>56</Typography>
              </div>
              <div className={styles.GoalBarWrap}>
                <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>G</Typography>
                <Progress percent={25} strokeColor="#6A2C70" strokeWidth={15} showInfo={false}/>
              </div>
              <div className={styles.GoalBarWrap}>
                <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>D</Typography>
                <Progress percent={65} strokeColor="#F08A5D" strokeWidth={15} showInfo={false}/>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default DashboardNew