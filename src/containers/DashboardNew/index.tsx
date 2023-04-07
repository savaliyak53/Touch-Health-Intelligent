import React, { useEffect, useState, useContext } from 'react';

import styles from './DashboardNew.module.scss'
import {Row, Col, Typography, Tooltip, Button, Progress } from 'antd'
import { AiOutlineQuestionCircle, AiOutlinePlus } from 'react-icons/ai';
import Layout from '../../layouts/Layout/Layout';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { getDashboard } from '../../services/dashboardservice';
import { useNavigate } from 'react-router-dom';
import { timeFrom } from '../../utils/lib';
import { tooltipContent } from '../../constants';
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
        const dates= timeFrom(14).sort((a:any, b:any) => a[0].localeCompare(b[0]));
         const new_streaks=dates.map((item,index)=> {
          const this_date=response.data.checkup_pattern.find((checkup:any)=>checkup[0]===item[0])
          if(!this_date && index===13){
            return dates[index]= [...dates[index], "purple"]
          }
          else if(this_date && this_date[1]===false && index===13){
            return dates[index]= [...dates[index], "purple"]
          }
          else if(this_date && this_date[1]===true){
            return dates[index]= [...dates[index], "orange"]
          }
          else{
            return dates[index]= [...dates[index], "grey"]
          }
         })
         setElementStreak(new_streaks)
         //updated pattern shows check true on today or yesterday then the streak is valid, otherwise zero
         if(dates[13][2]==="orange" || dates[12][2] === "orange"){
          setStreakCount(response.data.checkup_streak)
         }
         else {
          setStreakCount(0)
         }
        
        }
      })
      .catch((error) => {
        console.log('error is ', error);
        setLoading(false);
        toast(error);
      });
  }, []);
  
  
  return (
    <Layout defaultHeader={true} hamburger={true} dashboard={false}>
      <Spin spinning={loading}>
      <div>    
        <Row>
          <Col span={21}>
          <div className={`Title`}>Your Dashboard</div>
          </Col>
          <Col span={1}>
          </Col>
          <Col span={2}>
            <Tooltip
              title={tooltipContent.dashboardText}
              placement="bottomRight"
              overlayStyle={{ marginRight: '10px' }}
              color="blue"
              mouseLeaveDelay={0}
            >
              <AiOutlineQuestionCircle
                size={35}
                className={styles.TitleToolTip}
              />
            </Tooltip>
          </Col>
        </Row>
        <div className={`Heading Heading-color1 ${styles.StreakTitle}`}>{streakCount && streakCount >0 ? `${streakCount} day streak!` :'No current streak'}</div>
        <Row>
          <Col span={21}>
            <Row>
              <Col span={24}>
                <div className={styles.TagWrap}>
                  {elementStreak && elementStreak.map((item:any,index:number)=> {
                    if(item[2]==="purple"){
                        return <div className={styles.Tag} key={index}>
                        <div className={styles.Streak} style={{backgroundColor:'#6A2C70'}}></div>
                        <div className={styles.StreakDay}>{item[1]}</div>
                      </div>
                    }
                    else if(item[2]==="grey"){
                        return <div className={styles.Tag} key={index}>
                        <div className={styles.Streak} style={{backgroundColor:'#E8E8E8'}}></div>
                        <div className={styles.StreakDay}>{item[1]}</div>
                      </div>
                      }
                    else if(item[2]==="orange"){
                      return <div className={styles.Tag} key={index}>
                        <div className={styles.Streak} style={{backgroundColor:'#F08A5D'}}></div>
                        <div className={styles.StreakDay}>{item[1]}</div>
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
              title={tooltipContent.streakText}
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
               <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>Goal</Typography>
               <Progress percent={item.success_score} strokeColor="#6A2C70" strokeWidth={15} showInfo={false}/>
             </div>
             <div className={styles.GoalBarWrap}>
               <Typography className={styles.GoalLetter} style={{color:'#6A2C70'}}>Data</Typography>
               <Progress percent={item.data_score} strokeColor="#F08A5D" strokeWidth={15} showInfo={false}/>
             </div>
           </div>
         </Col>
        </Row>)
        : 
        <Row key="#nodata"> 
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