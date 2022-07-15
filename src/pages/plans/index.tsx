import Button from '@/components/buttons/Button';
import CreatePlanIcon from '@/components/buttons/CreatePlanIcon';
import ErrorPage from '@/components/Error';
import Input from '@/components/input/input';
import Card from '@/components/layout/Card';
import Layout from '@/components/layout/Layout';
import PlanCard from '@/components/layout/PlanCardListView';
import PlanCardListView from '@/components/layout/PlanCardListView';
import TravelCard from '@/components/layout/TravelCard';
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
import { UserPlans } from 'types/Plan';

export const getServerSideProps: GetServerSideProps<
  ServerSideProps<UserPlans>
> = async (context) => {
  if (!context.req.cookies['Authorization']) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?redirect=/plans',
      },
      props: {},
    };
  }
  const data = await Client(
    'GET',
    `/plans/me`,
    null,
    context.req.cookies['Authorization']
  );
  if (data.status == 401) {
    return {
      props: {
        error: true,
        message: data.message,
        data: null,
      },
      redirect: {
        permanent: false,
        destination: '/login?redirect=/plans',
      },
    };
  } else if (data.status !== 200) {
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

const GetMyPlan: NextPage<ServerSideProps<UserPlans>> = ({
  error,
  data,
  message,
}) => {
  const [plans, setPlans] = useState<Plans[]>(data?.plans ?? []);
  if (error) return <ErrorPage message={message} />;
  return (
    <>
      <section
        className='mx-auto mt-24'
        style={{ fontFamily: 'LeeSeoyun', maxWidth: '80vw' }}
      >
        <h1 className='mx-auto mb-5 flex justify-center text-4xl'>
          내가 만든 계획
        </h1>
        <div className='flex space-x-4'>
          {plans.map((plan, index) => (
            <TravelCard plan={plan} key={index} />
          ))}
        </div>
      </section>
      <CreatePlanIcon />
    </>
  );
};

export default GetMyPlan;
