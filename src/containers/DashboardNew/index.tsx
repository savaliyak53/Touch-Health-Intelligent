import styles from './DashboardNew.module.scss'
import {Row, Col, Typography, Tooltip, Button, Progress } from 'antd'
import { AiOutlineQuestionCircle, AiOutlinePlus } from 'react-icons/ai';
import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../layouts/Layout/Layout';
//import './index.scss';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { getDashboard } from '../../services/dashboardservice';
import { useNavigate } from 'react-router-dom';
import {format} from 'date-fns';

const DashboardNew = () => {
  const [elements, setElements] = useState<any>();
  const [elementStreak, setElementStreak] = useState<any>();
  const [streakCount, setStreakCount] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const date = new Date();

  useEffect(() => {
    setLoading(true);

    getDashboard()
      .then((response) => {
        setLoading(false);
        if (response.data) {
         setElements(response.data.elements);
         setElementStreak(response.data.checkup_pattern.sort((a:any, b:any) => a[0].localeCompare(b[0])))
         setStreakCount(response.data.checkup_streak)
        }
      })
      .catch((error) => {
        console.log('error is ', error);
        setLoading(false);
        toast('Something went wrong');
      });
  }, []);
  return (
    <Layout defaultHeader={true} hamburger={true} dashboard={false}>
      <Spin spinning={loading}>
      <div>
        <Typography style={{color:'#6A2C70'}} className={styles.Title}>{streakCount && streakCount >0 ? `${streakCount} day streak!` :'No current streak'}</Typography>
        <Row>
          <Col span={21}>
            <Row>
              <Col span={24}>
                <div className={styles.TagWrap}>
                  {elementStreak && elementStreak.map((item:any,index:number)=> {
                    const date = new Date(item[0]);
                    const day= format(date, 'EEEEE');
                    const today = new Date();

                    if(item[1]===false){
                      if(format(today, 'yyyy-MM-dd')===format(date, 'yyyy-MM-dd')){
                        return <div className={styles.Tag} key={index}>
                        <div className={styles.Streak} style={{backgroundColor:'#6A2C70'}}></div>
                        <div className={styles.StreakDay}>{day}</div>
                      </div>
                      }
                      else{
                        return <div className={styles.Tag} key={index}>
                        <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                        <div className={styles.StreakDay}>{day}</div>
                      </div>
                      }
                    }
                    
                    else{
                      return <div className={styles.Tag}>
                        <div className={styles.Streak} style={{backgroundColor:'#F08A5D'}}></div>
                        <div className={styles.StreakDay}>{day}</div>
                      </div>
                    }
                  }
                  )}  
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
              <Button className={styles.GoalsHeadButton} onClick={()=>navigate("/add-goals")}>+</Button>
            </div>
          </Col>
        </Row>
        {elements ? elements.map((item:any)=> 
         
         <Row key={item.id}>
         <Col span={24}>
           <div className={styles.Goal} onClick={()=>navigate(`/goals/${item.id}`)}>
             <div className={styles.GoalHeadWrap}>
               <Typography className={styles.GoalTitle} style={{color:'#6A2C70'}}>{item.name}</Typography>
               <Typography className={styles.GoalCount} style={{color:'#6A2C70'}}>{item.success_score}</Typography>
             </div>
             <div className={styles.GoalBarWrap}>
               <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>G</Typography>
               <Progress percent={item.success_score} strokeColor="#6A2C70" strokeWidth={15} showInfo={false}/>
             </div>
             <div className={styles.GoalBarWrap}>
               <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>D</Typography>
               <Progress percent={item.data_score} strokeColor="#F08A5D" strokeWidth={15} showInfo={false}/>
             </div>
           </div>
         </Col>
        </Row>)
        : 
        <Row > 
          <Col span={24}>
            <div className={styles.Goal} >
              <div className={styles.GoalHeadWrap}>
                <Typography className={styles.GoalTitle} style={{color:'#6A2C70', alignItems:'center'}}>No Data to Show</Typography>
              </div>
            </div>
          </Col>
        </Row>
        }
       
      </div>
      </Spin>
    </Layout>
  )
}

export default DashboardNew