import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import './index.scss';
import SwitchQuestion from '../../components/SwitchQuestion/SwitchQuestion';
import {
  getConditionsSearch,
  getConditionsService,
} from '../../services/dashboardservice';
import { toast } from 'react-toastify';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';
const data = [
  {
    Title: '250.81',
    Text: 'Diabetes with other specified manifestations, type I',
    Checked: true,
  },
  {
    Title: '714.0',
    Text: 'Rheumatoid arthritis',
    Checked: false,
  },
  {
    Title: '850.5',
    Text: 'Concussion with loss of consciousness of unspecified duration',
    Checked: true,
  },
];

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
  const onChange = async () => {
    console.log('onChange');
  };
  const handleSearch = (value: string) => {
    let res: string[] = [];
    if (!value) {
      res = [];
    } else {
      const result: any = getConditionsSearch(value)
        .then((response: any) => {
          if (response?.data) {
            console.log(
              response.data.map((item: any) => {
                return { value: item.title, key: item.condition_id };
              })
            );
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
  useEffect(() => {
    //getConditions();
  }, []);
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
              style={{ width: 200 }}
              onSearch={handleSearch}
              placeholder="input here"
              options={result}
            >
              {/* {result.map((email: string) =>  (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))} */}
            </AutoComplete>
            {/* <Select
              mode="multiple"
              showSearch
              placeholder="Add a condition"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            /> */}

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
