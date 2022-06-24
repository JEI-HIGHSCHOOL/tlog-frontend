import Button from '@/components/buttons/Button';
import ErrorPage from '@/components/Error';
import Input from '@/components/input/input';
import Card from '@/components/layout/Card';
import Layout from '@/components/layout/Layout';
import PlanCardListView from '@/components/layout/PlanCardListView';
import UserPlanCard from '@/components/layout/UserPlanCard';
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
        className='container mx-auto'
        style={{ fontFamily: 'LeeSeoyun' }}
      >
        <h1 className='mx-auto mb-5 flex justify-center text-4xl'>
          내가 만든 계획
        </h1>
        <div className='flex flex-col space-y-2'>
        {plans.map((plan) => (
          <UserPlanCard key={plan.id} plan={plan} owner={data?.owner} />
        ))}
        </div>
      </section>
    </>
  );
};

export default GetMyPlan;
