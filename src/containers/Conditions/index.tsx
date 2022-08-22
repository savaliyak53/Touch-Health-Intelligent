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
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Spin } from 'antd';

const ManageConditions = () => {
  const [data, setData] = useState<any>();
  const [result, setResult] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  const getConditions = async () => {
    setLoading(true);
    getConditionsService()
      .then((response) => {
        setLoading(false);
        setData([...response.data.conditions]);
      })
      .catch((error) => {
        console.log('error is ', error);
        setLoading(false);
        toast('Something went wrong');
      });
  };

  useEffect(() => {
    getConditions();
  }, []);

  const handleClose = (id: string) => {
    setData(data.filter((item: any) => item.condition_id !== id));
  };

  const handleSearch = (value: string) => {
    setSelectedValue(value);
    if (value) {
      setLoading(true);
      getConditionsSearch(value)
        .then((response: any) => {
          setLoading(false);
          if (response?.data) {
            setResult(
              response.data.map((item: any) => {
                return { value: item.title, key: item.condition_id };
              })
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('error while searching ', error);
          toast('Something went wrong. Please contact support.');
        });
    }
  };

  const addUpdateCondition = (conditions: any) => {
    setLoading(true);
    addConditionsService({
      conditions: conditions,
    })
      .then((response) => {
        setLoading(false);
        toast.success('Conditions updated successfully');
        setSelectedValue('');
        getConditions();
      })
      .catch((error) => {
        setLoading(false);
        console.log('error while adding condition', error);
        toast.error('Something went wrong. Please contact support.');
      });
  };

  const handleOptionSelect = (value: string, option: any) => {
    const condition = data.find((d: any) => d.condition_id === option.key);
    if (condition) {
      return toast('Condition already exists');
    }
    addUpdateCondition([{ condition_id: option.key, active: true }]);
  };

  const handleUpdateCondition = (id: string, checked: boolean) => {
    addUpdateCondition([{ condition_id: id, active: checked }]);
  };

  const handleDeleteCondition = (id: string) => {
    setLoading(true);
    deleteCondition(id)
      .then((response: any) => {
        setLoading(false);
        toast.success('Condition removed');
        getConditions();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error('Something went wrong while removing the condition', error);
      });
  };

  return (
    <Layout defaultHeader={true} hamburger={true}>
      <div className="Content-wrap Con">
        <h2 className="Con-title">
          Manage conditions <Spin spinning={loading} />
        </h2>
        <p className="Con-Description">
          These are your current conditions, turn them off to remove, add a new
          one using the search bar.
        </p>

        <div className="Select-Wrap">
          <SearchOutlined className="search" />
          <AutoComplete
            onSearch={handleSearch}
            placeholder="Search"
            options={result}
            onSelect={handleOptionSelect}
          ></AutoComplete>

          <DownOutlined />
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
              checked={data.active}
              handleDelete={handleDeleteCondition}
              handleUpdate={handleUpdateCondition}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ManageConditions;
