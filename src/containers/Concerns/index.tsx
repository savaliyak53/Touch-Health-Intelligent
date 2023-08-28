import React, { useState, useEffect } from 'react';
import Layout from 'layouts/Layout/Layout';
import './index.scss';
import SwitchQuestion from 'components/SwitchQuestion/SwitchQuestion';
import {
  addConcernsService,
  deleteConcern,
  getConcernsSearch,
  getConcernsService,
} from 'services/dashboardservice';
import { toast } from 'react-toastify';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Spin } from 'antd';
import { useNavigate } from 'react-router';
const ManageConcerns = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [result, setResult] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const getConcerns = async () => {
    setLoading(true);
    getConcernsService()
      .then((response) => {
        setLoading(false);
        setData([...response.data.concerns]);
      })
      .catch((error) => {
        console.log('error is ', error);
        setLoading(false);
        toast('Something went wrong');
      });
  };

  useEffect(() => {
    getConcerns();
  }, []);

  const handleClose = (id: string) => {
    setData(data.filter((item: any) => item.concern_id !== id));
  };

  const handleSearch = (value: string) => {
    setSelectedValue(value);
    if (value) {
      setLoading(true);
      getConcernsSearch(value)
        .then((response: any) => {
          setLoading(false);
          if (response?.data) {
            setResult(
              response.data.map((item: any) => {
                return { value: item.title, key: item.concern_id };
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

  const addUpdateConcern = (concerns: any) => {
    setLoading(true);
    addConcernsService({
      concerns: concerns,
    })
      .then((response) => {
        setLoading(false);
        toast.success('Concerns updated successfully');
        setSelectedValue('');
        getConcerns();
      })
      .catch((error) => {
        setLoading(false);
        console.log('error while adding Concern', error);
        toast.error('Something went wrong. Please contact support.');
      });
  };

  const handleOptionSelect = (value: string, option: any) => {
    const concern = data.find((d: any) => d.concern_id === option.key);
    if (concern) {
      return toast('Concern already exists');
    }
    addUpdateConcern([{ concern_id: option.key, active: true }]);
  };

  const handleUpdateConcern = (id: string, checked: boolean) => {
    addUpdateConcern([{ concern_id: id, active: checked }]);
  };

  const handleDeleteConcern = (id: string) => {
    setLoading(true);
    deleteConcern(id)
      .then((response: any) => {
        setLoading(false);
        toast.success('Concern removed');
        getConcerns();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error('Something went wrong while removing the Concern', error);
      });
  };
  const handleNavigate = () => {
    setIsLoading(true);
    navigate('/subscription');
  };
  return (
    <>
      <Layout
        defaultHeader={true}
        hamburger={location.pathname === '/concerns' ? false : true}
        title='Concerns'
      >
        <div
          className="Content-wrap Concerns"
          // onClick={() => setIsDropdownOpen(false)}
        >
          <h2 className="Concerns-title">
            Manage concerns
            <Spin spinning={loading} />
          </h2>
          <p className="Concerns-Description">
            These are your current concerns, they can be things like stress,
            pain, memory issues or physical symptoms
          </p>

          <div className="Select-Wrap">
            <SearchOutlined className="search" />
            <AutoComplete
              onSearch={handleSearch}
              placeholder="Search Concern"
              options={result}
              onSelect={handleOptionSelect}
              value={selectedValue}
              open={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ></AutoComplete>
            <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
          </div>
          <div className="Switch-wrap">
            <h3 className="Title">My concerns</h3>
            {data?.map((data: any, i: any) => (
              <SwitchQuestion
                key={i}
                title={data.title}
                text={data.text}
                id={data.concern_id}
                handleClose={handleClose}
                checked={data.active}
                handleDelete={handleDeleteConcern}
                handleUpdate={handleUpdateConcern}
              />
            ))}
          </div>
          {location.pathname === '/concerns' && (
            <Button
              className="Pref-btn btn"
              onClick={handleNavigate}
              loading={isLoading}
            >
              Next
            </Button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ManageConcerns;
