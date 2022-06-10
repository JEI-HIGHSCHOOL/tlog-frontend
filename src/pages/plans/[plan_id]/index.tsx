import Button from '@/components/buttons/Button';
import ErrorPage from '@/components/Error';
import Input from '@/components/input/input';
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
import {
  Geolocation,
  Plan,
  Plans,
  SearchLocation,
  ServerSideProps,
} from 'types';

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const data = await Client(
    'GET',
    `/plans/${encodeURI(context.params?.plan_id as string)}`,
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

const GetPlan: NextPage<ServerSideProps<Plans>> = ({
  error,
  data,
  message,
}) => {
  const [plans, setPlans] = useState<Plan[]>(data?.plans ?? []);
  const deletePlanHandler = async (id: string) => {
    await Client('DELETE', `/plans/${data?.id}/${id}`).then((res) => {
      if (res.status !== 200) {
        Toast(res.message, 'error');
      } else {
        Toast(res.message);
        setPlans((prev) => prev.filter((plan) => plan.id !== id));
      }
    });
  };
  if (error) return <ErrorPage message={message} />;
  return (
    <>
      <section
        className='container mx-auto px-4'
        style={{ fontFamily: 'LeeSeoyun', maxWidth: '1000px' }}
      >
        <div className='mb-5'>
          <h1 className='mx-auto flex justify-center text-4xl'>
            {data?.title}
          </h1>
          <h1 className='mx-auto flex justify-end text-xl'>
            {data?.owner.name}님의 여행계획
          </h1>
        </div>
        <div className='space-y-5'>
          {plans.map((plan) => (
            <PlanCardListView
              location={plan}
              key={plan.id}
              deletePlan={deletePlanHandler}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default GetPlan;