import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Layout from 'layouts/Layout';
import {  getGuidanceById } from '../../services/dashboardservice';
import ArrowIcon from 'components/Icons/ArrowIcon';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

type guidanceDataTypes = {
  name: string,
  guidance_id: string,
  info_md: string,
  science_md: string,
}

const Guidance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<any>();
  const [guidanceData, setGuidanceData] = useState<guidanceDataTypes | null>();
  const [selectedType, setSelectedType] = useState("guidance");

  const getGuidanceData = async () => {
    try {
      if (id) {
        const response = await getGuidanceById(id);
        setGuidanceData(response?.data);
      }
    } catch (error: any) {
      if (error.response) {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      }
    }
  };

  const onBackHandler = () => {
		navigate(-1);
  }

  useEffect(() => {
    getGuidanceData();
  },[id])
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Layout defaultHeader={false} hamburger={false} withoutMargin={true}>
      <section className='relative bg-[#080815] pt-[155px] pb-[21px] px-[20px] text-left'>
        <div className='flex absolute top-10 cursor-pointer' onClick={() => onBackHandler()}>
          <ArrowIcon className="inline mr-2 brightness-0 invert"/>
          <span className='text-white text-[12px]'>Back</span>
        </div>
        <div className='text-[22px] text-[#FFF] font-["tilt_warp"]'>{guidanceData?.name}</div>
        {/* <div className='text-[12px] text-[#FFF] pt-2'>
          {guidanceData &&
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {guidanceData.info.description_md}
            </ReactMarkdown>
          }
        </div> */}
      </section>
      <section className='px-[20px] py-[20px]'>
        <div>
          <button className={`text-[12px] px-[57px] py-[10px] ${selectedType === "guidance" && "rounded-[20px] shadow-[2px_2px_0_0_#F1EEE9]"}`} onClick={() => setSelectedType("guidance")}>Guidance</button>
          <button className={`text-[12px] px-[57px] py-[10px] ${selectedType === "science" && "rounded-[20px] shadow-[2px_2px_0_0_#F1EEE9]"} `} onClick={() => setSelectedType("science")}>The science</button>
        </div>
        <div className='pt-[16px] text-left'>
          {guidanceData && (
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {selectedType === "guidance" ? guidanceData.info_md : guidanceData.science_md}
            </ReactMarkdown>
            )
          }
        </div>
      </section>
      <section className='bg-[#F9F7F4] rounded-[5px] text-left px-[20px] pt-[11px] pb-[30px]'>
        <div className='text-[18px] font-["tilt_warp"] leading-[36px] pb-2'>Explore more</div>
        <div className='w-full flex gap-3'>
          <div className='w-full rounded-[5px] bg-white shadow-[0_4px_0_0_#F0ECE7] pt-[39px] px-[19px] pb-[14px] cursor-pointer'>
            <div className='text-[18px] leading-[24px] font-["tilt_warp"]'>Sleep</div>
            <div className='text-[12px]'>Avoiding Blue Light</div>
          </div>
          <div className='w-full rounded-[5px] bg-white shadow-[0_4px_0_0_#F0ECE7] pt-[39px] px-[19px] pb-[14px] cursor-pointer'>
            <div className='text-[18px] leading-[24px] font-["tilt_warp"]'>Sleep</div>
            <div className='text-[12px]'>Avoiding Blue Light</div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Guidance;
