import Button from '@/components/buttons/Button';
import ErrorPage from '@/components/Error';
import Input from '@/components/input/input';
import Constants from '@/utils/Constants';
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
import ImageSlider from 'image-slider-react';

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
    `/plans/${encodeURI(context.params?.plan_id as string)}/${encodeURI(
      context.params?.id as string
    )}/detail`,
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
  const [plan, setPlan] = useState<Plan | undefined>(data ?? undefined);
  const [map, setMap] = useState<kakao.maps.Map>();
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadImage = e.target.files[0];
      const formData = new FormData();
      formData.append('img', uploadImage);
      request(
        'POST',
        `/plans/${plan?.planId}/${plan?.id}/image`,
        formData
      ).then((res) => {
        image.push(Constants.CLOUD_FRONT + '/' + res.data);
      });
    }
  };
  const image: string[] =
    plan?.planImage?.map((image) => {
      return Constants.CLOUD_FRONT + '/' + image.imageUrl;
    }) || [];
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
        <div className='my-7 overflow-hidden'>
          {(!plan?.planImage && plan?.planImage?.length === 0) ||
          image.length === 0 ? (
            <>
              <div className='flex w-full items-center justify-center'>
                <label
                  htmlFor='dropzone-file'
                  className='dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='mb-3 h-10 w-10 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      ></path>
                    </svg>
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>업로드할 파일 선택</span>
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      PNG, JPG 또는 GIF
                    </p>
                  </div>
                  <input
                    accept='image/*'
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                    onChange={onChangeImg}
                  />
                </label>
              </div>
            </>
          ) : (
            <>
              <ImageSlider images={image} height='100%' width='600px' />
            </>
          )}
        </div>
        <div className='my-7'>
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
                      <div className='ellipsis'>{plan?.place_address}</div>
                      <div className='jibun ellipsis'>
                        {plan?.place_phone && (
                          <>전화번호 - {plan?.place_phone}</>
                        )}
                        {!plan?.place_phone && !plan?.place_address && (
                          <>정보없음</>
                        )}
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
