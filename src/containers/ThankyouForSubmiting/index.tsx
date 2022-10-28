import React, { useState, useEffect } from 'react';
import Layout from '../../layouts/Layout/Layout';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  addConditionsService,
  getConditionsSearch,
  getConditionsService,
  getDefaultConditions,
} from '../../services/dashboardservice';
import { toast } from 'react-toastify';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Divider } from 'antd';
const index = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>([]);
  const [data, setData] = useState<any>();
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getConditions = async () => {
    getConditionsService()
      .then((response) => {
        setData([...response.data.conditions]);
      })
      .catch((error) => {
        console.log('error is ', error);
        toast('Something went wrong');
      });
  };
  const getDefaultCondition = async () => {
    getDefaultConditions()
      .then((response) => {
        setResult(response.data.map((item: any) => {
          return { value: item.title, key: item.condition_id };
        }));
      })
      .catch((error) => {
        toast('Something went wrong');
      });
  };
  const handleSearch = (value: string) => {
    setSelectedValue(value);
    if (value) {
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
          console.log('error while searching ', error);
          toast('Something went wrong. Please contact support.');
        });
    }
    else {
      getDefaultCondition()
    }
    
  };
  const addUpdateCondition = (conditions: any) => {
    addConditionsService({
      conditions: conditions,
    })
      .then((response) => {
        toast.success('Conditions updated successfully');
        setSelectedValue('');
        // getConditions();
        navigate('/post-conditions')
      })
      .catch((error) => {
        console.log('error while adding condition', error);
        toast.error('Something went wrong. Please contact support.');
      });
  };
  const handleOptionSelect = (value: string, option: any) => {
    const condition = data.find((d: any) => d.condition_id === option.key);
    setSelectedValue(value)
    if (condition) {
      return toast('Condition already exists');
    }
    addUpdateCondition([{ condition_id: option.key, active: true }]);
  };
  useEffect(() => {
    getConditions();
    getDefaultCondition();
  }, []);  return (
    <Layout defaultHeader={true} hamburger={true}>
      <div className="Content-wrap DayCon">
        <div className="Question">
          <h3 className="Question-title">You&apos;re done for the day!</h3>
          <h4 className="Question-title" style={{fontSize:"22px"}}>Is there anything else you would like to do before you go?</h4>
        </div>
        <div className="Divider-wrap">
          <div className="Divider">
            <Divider style={{borderTop: "3px solid #353434", borderRadius: "10px", color:"#353434"}} />
          </div>
        </div>


        <div className="Select-Wrap">
          <SearchOutlined className="search" />   
          <AutoComplete
            onSearch={handleSearch}
            placeholder="Add a concern, condition"
            options={result}
            onSelect={handleOptionSelect}
            value={selectedValue}
            open={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ></AutoComplete>

          <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
        </div>
        <button className="submit" onClick={() => navigate('/dashboard')}>
          Home
        </button>
      </div>
    </Layout>
  );
};

export default index;
