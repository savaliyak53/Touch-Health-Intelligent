import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Layout from 'layouts/Layout';
import { getConditionInfluencerDetails, getLifestylenInfluencerDetails } from '../../services/dashboardservice';
import { dateFormatted } from '../../utils/lib';
import PredictionGraph from "../../components/PredictionGraph";
import TemporaryBackground from "../../components/PredictionGraph/TemporaryBackground";
import { useSearchParams } from 'react-router-dom';

type influencerDataTypes = {
  name: string;
  header_text: string;
  prediction_text: string;
  influencer_id: string;
  parent_dimension_id: string;
  prediction_ordered_list:{
    dt: string,
    value: number,
    score: number,
    emoji: string,
    uncertainy: number,
  }[];
  guidances_list:{
    name: string,
    health_dimension: string,
    guidance_id: string,
  }[]
}

const Prediction = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [startY,setStartY] = useState<number>(0);
  const [influencerData, setInfluencerData] = useState<influencerDataTypes | null>(null);
  const [error, setError] = useState<any>();

  const influencer_id = searchParams.get('influencer_id');
  const dimension_id = searchParams.get('dimension_id');
  const predictionType = searchParams.get('type');

  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - 1);

  const getInfluencerData = async () => {
    if (!!influencer_id && !!dimension_id) {
      try {
        let response;
        if (predictionType === "conditions") {
          response = await getConditionInfluencerDetails(dimension_id, influencer_id);
        } else if (predictionType === "influencers") {
          response = await getLifestylenInfluencerDetails(dimension_id, influencer_id);
        }
        if (response?.data) {
          setInfluencerData(response.data);
        } else {
          setError({
            code: 204,
            message: "No data found!",
          });
        }
      } catch (error: any) {
        if (error.response) {
          setError({
            code: error.response.status,
            message: error.response.data.details,
          });
        }
      }
    }
  };

  const handleTouchStart = (e:any) => {
    setStartY(e.touches[0].clientY);
  }

  const handleTouchEnd = (e:any) => {
    const endY= e.changedTouches[0].clientY;
    const swipeYDistance = endY - startY;
    const swipeYDist = Math.abs(swipeYDistance); 
    if(swipeYDist > 30){
      if(swipeYDistance > 0){
        setIsDrawerOpen(false);
      }else{
       setIsDrawerOpen(true);
      }
    }
  }

  useEffect(() => {
    getInfluencerData();
  },[dimension_id, influencer_id])
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Layout defaultHeader={false} hamburger={false} withoutMargin={true}>
      <section className='h-screen'>
        <section className='pt-[100px] pb-[40px] bg-primary-delft-dark relative'>
          <div className='absolute top-4 left-3 z-10'>
            <img src="/assets/icons/blue-arrow-left.svg" alt='back' className='h-[22px] cursor-pointer grayscale invert' onClick={() => navigate("/dashboard")}/>
          </div>
          <div className='h-6 w-6 bg-[#ffffff80] rounded-full m-auto'>
            {/* Change prevDate to currentDate (new Date()) after getting proper backend response */}
            <span className='text-[12px] flex justify-center items-center h-full'>{influencerData?.prediction_ordered_list?.find((prediction) => prediction?.dt === dateFormatted(prevDate))?.emoji || null}</span>
          </div>
          <div className='font-["tilt_warp"] text-white text-[18px] leading-[28px] text-center pt-[7px]'>{influencerData?.name}</div>
          <div className='text-[12px] text-white px-[15px] leading-[14px] text-center'>{influencerData?.header_text}</div>
          <div className='font-["tilt_warp"] text-white text-[60px] pt-8 text-center'>
            {/* Change prevDate to currentDate (new Date()) after getting proper backend response */}
            {influencerData?.prediction_ordered_list?.find((prediction) => prediction?.dt === dateFormatted(new Date()))?.score || influencerData?.prediction_ordered_list?.find((prediction) => prediction?.dt === dateFormatted(prevDate))?.value}
          </div>
          {influencerData?.prediction_ordered_list &&  <PredictionGraph data={influencerData.prediction_ordered_list} />}
          <TemporaryBackground />
        </section>
        <section onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className={`bg-white px-5 h-full rounded-t-lg relative z-10 -top-3 ease-in-out duration-200 ${isDrawerOpen ? '-translate-y-[435px]' : '-translate-y-[0px]'}`}>
          <div className='absolute -top-3 m-auto left-0 right-0'>
            <img src="/assets/icons/collapse-arrow-white.svg" alt='collapse' className={`m-auto cursor-pointer ${isDrawerOpen && "rotate-180"}`} onClick={() => setIsDrawerOpen(!isDrawerOpen)}/>
          </div>
          <div className='pt-7 pb-[23px] border-b-[1px] border-b-[#F6F3F0]'>
            <div className='font-["tilt_warp"] text-primary-delft-dark text-center text-[18px] leading-[21px]'>🔮 Prediction</div>
            <div className='text-center text-[12px] max-w-md m-auto pt-4'>{influencerData?.prediction_text}</div>
          </div>
          <div className='mt-[18px] bg-[#83a5f24d] rounded-[10px] shadow-[0_4px_0_0_#8AA4EC] max-w-md m-auto'>
            <div className='flex gap-4 mx-[10px] px-[8px] py-[15px]'>
              <img src="/assets/images/health-prediction.svg" alt='health' />
              <div className='flex flex-col gap-1 pt-[2px] text-left'>
                <div className='font-["tilt_warp"] text-[14px] leading-[16px] text-primary-delft-dark'>Take control of your health</div>
                <div className='text-[12px] leading-[14px] text-primary-delft-dark'>Predictions are subjective; they can change over time. I have some guidances that can help you improve your daytime alertness.</div>
              </div>
            </div>
          </div>
          <div className='mt-6 mb-6 bg-[#FDFCFB] shadow-[0_4px_0_0_#F0ECE7] rounded-[10px] pl-[21px] pr-[18px] max-w-md m-auto'>
            <div className='uppercase text-[12px] text-left leading-[16px] text-primary-delft-dark opacity-70 pt-[9px] pb-[6px] border-b-[1px] border-[#F0ECE7]'>your guidance</div>
            <div>
              {influencerData?.guidances_list?.length &&
                influencerData?.guidances_list?.map((guidance) => (
                  <div key={guidance?.guidance_id} className='flex justify-between py-[20px] border-b-[1px] border-[#F0ECE7] pl-1'>
                    <div className='text-[12px]'><span className='font-["tilt_warp"] text-[14px] text-primary-delft-dark'>{guidance?.name}</span> {guidance?.health_dimension}</div>
                    <img src="/assets/icons/right-indicate-icon.svg" alt='arrow' className='cursor-pointer' onClick={() => navigate(`/guidance?type=${predictionType}&guidance_id=${guidance.guidance_id}&dimension_id=${influencerData.parent_dimension_id}`)}/>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Prediction;
