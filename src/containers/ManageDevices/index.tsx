import React, { useEffect, useState } from 'react';
import { sessionsService, logoutService } from '../../services/authservice';
import { Button, Spin } from 'antd';
import Layout from '../../layouts/Layout/Layout';
import styles from './ManageDevices.module.scss'

const ManageDevices = () => {

    const [devices, setDevices] = useState([]);
    const [spinning, setSpinning] = useState<boolean>(true);


    const getSessionData = () => {
        sessionsService()
        .then((res: any) => {
            if(res.data){
                setSpinning(false);
                setDevices(res.data);
            }
        })
    }

    const deviceSignout = (id: string) => {
        logoutService(id)
        .then(res => {
            if(res){
                getSessionData()
            }
        })
    }
    useEffect(() => {
        getSessionData()
    }, [])
    return (
        <Layout defaultHeader={true} hamburger={true}>
            <Spin spinning={spinning}>
            <div className='Title'>Manage Devices</div>
            <div>
                {devices && devices.map((device: any, key: any) => (
                    <div className={styles['Device-Container']} key={key}>
                        <div className={`Heading ${styles['Device-Name']}`}>{device.user_agent.split('(')[1].split(')')[0].split(';').slice(-1)[0]}</div>
                        <Button className='Submit-Button' onClick={() => deviceSignout(device.id)}>Signout</Button>
                    </div>
                ))}
            </div>

            </Spin>
        </Layout>    
    );
};
export default ManageDevices;