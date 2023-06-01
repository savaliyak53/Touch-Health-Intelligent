import React, { useEffect, useState } from 'react';
import { sessionsService, deleteSessionService } from '../../services/authservice';
import { Button, Spin } from 'antd';
import Layout from '../../layouts/Layout/Layout';
import styles from './ManageDevices.module.scss'
import DeleteSessionModal from '../../components/Modal/DeleteSessionModal';
import parser from 'ua-parser-js';

const ManageDevices = () => {

    const [devices, setDevices] = useState([]);
    const [spinning, setSpinning] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [signoutDevice, setSignoutDevice] = useState<any>(null);


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
        deleteSessionService(id)
        .then(res => {
            if(res){
                getSessionData()
            }
        })
    }
    const handleCancel = () => {
        setOpen(false);
        setSignoutDevice(null);
    }
    const handleOk = () => {
        setOpen(false);
        deviceSignout(signoutDevice);
    }

    function extractDeviceName(userAgent: string) {
        const ua = parser(userAgent);
        return `${ua.device.vendor ?? ""} ${ua.device.model ?? ""} ${ua.os.name ?? ""} ${ua.browser.name ?? ""}`;

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
                        <div className={`Heading ${styles['Device-Name']}`}>{extractDeviceName(device.user_agent)}</div>
                        <Button className='Submit-Button' onClick={() => {setSignoutDevice(device.id); setOpen(true)}}>Signout</Button>
                    </div>
                ))}
            </div>
            <DeleteSessionModal 
                open={open}
                title={'Enter Password to Signout Device'}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />

            </Spin>
        </Layout>    
    );
};
export default ManageDevices;