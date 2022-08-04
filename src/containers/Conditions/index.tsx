import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import './index.scss';
import SwitchQuestion from '../../components/SwitchQuestion/SwitchQuestion';
import {
  addConditionsService,
  deleteCondition,
  getConditionsSearch,
  getConditionsService,
} from '../../services/dashboardservice';
import { toast } from 'react-toastify';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';

const ManageConditions = () => {
  const [data, setData] = useState<any>();
  const [result, setResult] = useState<any>([]);
  const getConditions = async () => {
    // const userId = localStorage.getItem('userId')
    try {
      const response: any = await getConditionsService();
      // <To-do-hamza> attach api data
      // setData(response.data.conditions)
      setData(response.conditions);
      setResult(response.conditions);
    } catch (error) {
      toast('unknown error');
    }
  };
  useEffect(() => {
    getConditions();
  }, []);
  const handleClose = (id: string) => {
    setData(data.filter((item: any) => item.condition_id !== id));
  };

  const handleSearch = (value: string) => {
    let res: string[] = [];
    if (!value) {
      res = [];
    } else {
      getConditionsSearch(value)
        .then((response: any) => {
          if (response?.data) {
            setResult(
              response.data.map((item: any) => {
                return { value: item.title, key: item.condition_id };
              })
            );
          }
        })
        .catch((error) => {
          toast('Unknown error');
        });
    }
  };

  const handleOptionSelect = (value: string, option: any) => {
    addConditionsService({
      conditions: [{ condition_id: value, active: true }],
    })
      .then((response) => {
        toast.success('Conditioned added successfully');
        getConditions();
      })
      .catch((error) => {
        console.log('error while adding condition', error);
      });
  };

  const handleDeleteCondition = (id: string) => {
    deleteCondition(id)
      .then((response: any) => {
        toast.success('Conditioned removed');
        getConditions();
      })
      .catch((error: any) => {
        toast.success(
          'Something went wrong while removing the condition',
          error
        );
      });
  };

  return (
    <>
      <Layout defaultHeader={true} hamburger={true}>
        <div className="Content-wrap Con">
          <h2 className="Con-title">Manage conditionss</h2>
          <p className="Con-Description">
            These are your current conditions, turn them off to remove, add a
            new one using the search bar.
          </p>

          <div className="Select-Wrap">
            <SearchOutlined className="search" />
            <AutoComplete
              onSearch={handleSearch}
              placeholder="input here"
              options={result}
              onSelect={handleOptionSelect}
            ></AutoComplete>

            <RightOutlined />
          </div>

          <div className="Switch-wrap">
            <h3 className="Title">My Conditions</h3>
            {data?.map((data: any, i: any) => (
              <SwitchQuestion
                key={i}
                title={data.title}
                text={data.text}
                id={data.condition_id}
                handleClose={handleClose}
                checked={data.Checked}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ManageConditions;
