import Button from '@/components/buttons/Button';
import ErrorPage from '@/components/Error';
import Input from '@/components/input/input';
import Constants from "@/utils/Constants"
import Card from '@/components/layout/Card';
import Layout from '@/components/layout/Layout';
import PlanCardListView from '@/components/layout/PlanCardListView';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';
import Client from '@/utils/ApiClient';
import Toast from '@/utils/Toast';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import ImageSlider from 'react-simple-image-slider';
import {
  Geolocation,
  Plan,
  Plans,
  SearchLocation,
  ServerSideProps,
} from 'types';
import request from '@/utils/ApiClient';

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const data = await Client(
    'GET',
    `/plans/${encodeURI(context.params?.plan_id as string)}/${encodeURI(context.params?.id as string)}/detail`,
    null,
    context.req.cookies['Authorization']
  );
  if (data.status !== 200) {
    return {
      props: {
        error: true,
        message: data.message,
        data: null,
      },
    };
  } else {
    return {
      props: {
        error: false,
        message: data.message,
        data: data.data,
      },
    };
  }
};

const GetPlanDetail: NextPage<ServerSideProps<Plan>> = ({
  error,
  data,
  message,
}) => {
  const [plan, setPlan] = useState<Plan|undefined>(data ?? undefined);
  const [map, setMap] = useState<kakao.maps.Map>();
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('img', uploadFile);
      request(
        'POST',
        `/plans/${plan?.planId}/${plan?.id}/image`,
        formData
      ).then((res) => {
        console.log(res);
      });
      console.log(uploadFile);
    }
  };
  const image: string[] = plan?.planImage?.map(image => {return Constants.BASE_API_URL + "/images/" + image.imageUrl}) || [];
  if (error) return <ErrorPage message={message} />;
  return (
    <>
      <section
        className='container mx-auto px-4'
        style={{ fontFamily: 'LeeSeoyun', maxWidth: '1000px' }}
      >
        <div className='mb-5'>
          <h1 className='mx-auto flex justify-center text-4xl'>
           {plan?.place_name}          
          </h1>
          <h1 className='mx-auto flex justify-end text-xl'>
            {plan?.plan?.title}
          </h1>
        </div>
        <div className='space-y-5'>
          {!plan?.planImage || plan.planImage.length === 0 ? <>
            
          </> : <>
          <ImageSlider
                width={'100%'}
                height={'500px'}
                images={image} showNavs={true} showBullets={true}          
          />
            </>}
            <input
        type='file'
        id='profile-upload'
        accept='image/*'
        onChange={onChangeImg}
      />
        </div>
        <div className='space-y-5'>
        <Map // 지도를 표시할 Container
            center={{
              lat: plan?.longitude ?? 0,
              lng: plan?.latitude ?? 0,
            }}
            style={{
              // 지도의 크기
              width: '100%',
              height: '400px',
            }}
            className='rounded-lg'
            level={7} // 지도의 확대 레벨
            onCreate={setMap}
          >
            <MapMarker
              position={{
                lat: plan?.longitude ?? 0,
                lng: plan?.latitude ?? 0,
              }}
            >
              <div className='map-wrap'>
                <div className='info'>
                  <div className='title'>{plan?.place_name}</div>
                  <div className='body'>
                    <div className='desc'>
                      <div className='ellipsis'>
                        {plan?.place_address}
                      </div>
                      <div className='jibun ellipsis'>
                        {plan?.place_phone && (
                          <>전화번호 - {plan?.place_phone}</>
                        )}
                        {!plan?.place_phone &&
                          !plan?.place_address && <>정보없음</>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MapMarker>
          </Map>
        </div>
      </section>
    </>
  );
};

export default GetPlanDetail;
