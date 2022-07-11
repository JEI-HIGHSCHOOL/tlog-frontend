import Card from '@/components/layout/Card';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import TravelCard from '@/components/layout/TravelCard'
import { GetStaticProps, NextPage } from 'next';
import { Plan, Plans, ServerSideProps } from 'types';
import Client from '@/utils/ApiClient';
import PlanCardStyle from "@/styles/planCard.module.css"

export const getStaticProps: GetStaticProps<ServerSideProps<HomePageProps>> = async() => {
    const data = await Client(
    'GET',
    `/plans/suggest`,
    null
  );
  if(data.status !== 200) {
    return {
      props: {
        message: data.message,
        data: {
          plans: []
        },
        error: true
      }
    }
  }
  return {
    props: {
      message: data.message,
      data: {
        plans: data.data
      },
      error: false
    },
    revalidate: 500
  }
}
const HomePage: NextPage<ServerSideProps<HomePageProps>> = ({error, message, data}) => {
  return (
    <>
    <section className='mt-10 flex items-center justify-center'>
        <Card
          background='#a0e4e8'
          badgeBackground='#2262b7'
          badgeMessage='여행'
          message={
            <>
              <p>여행을 가기전 간단하게</p>
              <p>계획을 세워보고 출발하세요</p>
            </>
          }
          submessage='빠른 여행 계획 세우기'
          image={
            <img
              src='/images/main-card-1.png'
              style={{
                width: '700px',
                position: 'absolute',
                left: '444px',
                marginTop: '-314px',
              }}
            />
          }
        />
      </section>
      <section className={PlanCardStyle.planCardWrap + " sm:space-x-2.5"}>
        {data?.plans.map((plan, index) => (
          <TravelCard plan={plan}/>
        ))}
      </section>
    </>
  );
}

interface HomePageProps {
  plans: Plans[]
}

export default HomePage;