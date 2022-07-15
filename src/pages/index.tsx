import Card from '@/components/layout/Card';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import TravelCard from '@/components/layout/TravelCard';
import { GetStaticProps, NextPage } from 'next';
import { Plan, Plans, ServerSideProps } from 'types';
import Client from '@/utils/ApiClient';
import PlanCardStyle from '@/styles/planCard.module.css';
import { useState } from 'react';
import landingCss from '@/styles/landing.module.css';
import moment from 'moment';
import { toStringByFormatting } from '@/utils/Fotmenter';

export const getStaticProps: GetStaticProps<
  ServerSideProps<HomePageProps>
> = async () => {
  const data = await Client('GET', `/plans/suggest`, null);
  const overview = await Client('GET', `/overview`);
  if (data.status !== 200 || overview.status !== 200) {
    return {
      props: {
        message: data.message,
        data: {
          plans: {
            new: [],
            like: [],
          },
          overview: {
            places: 0,
            plans: 0,
            users: 0,
          },
        },
        error: true,
      },
    };
  }
  return {
    props: {
      message: data.message,
      data: {
        plans: data.data,
        overview: overview.data,
      },
      error: false,
    },
    revalidate: 500,
  };
};
const HomePage: NextPage<ServerSideProps<HomePageProps>> = ({
  error,
  message,
  data,
}) => {
  const [sortType, setSortType] = useState<sortType>('like');
  return (
    <>
      <section className='mt-24 flex items-center justify-center'>
        <Card
          href='/plans/create'
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
      <section className='wrap mt-8 flex items-center justify-between font-bold'>
        <span className='text-xl'>추천하는 계획</span>
        <select
          className='rounded-lg border-gray-300'
          onChange={(e) => setSortType(e.target.value as sortType)}
        >
          <option value={'like'}>추천순</option>
          <option value={'new'}>최신순</option>
        </select>
      </section>
      <section
        className={
          PlanCardStyle.planCardWrap + ' sm:grid sm:grid-cols-2 sm:gap-2.5'
        }
      >
        {data?.plans[sortType].slice(0, 6).map((plan, index) => (
          <TravelCard plan={plan} key={index} />
        ))}
      </section>
      <section
        className='wrap font-bol flex min-h-[80vh] flex-col items-center justify-center'
        style={{ fontFamily: "font-family: 'Noto Sans KR', sans-serif" }}
      >
        <h1 className='text-xl'>
          {toStringByFormatting(new Date(), '.')} 기준
        </h1>
        <table className={landingCss.overviewTable}>
          <thead>
            <tr>
              <th>누적 장소</th>
              <th>생성된 계획</th>
              <th>이용중인 유저</th>
            </tr>
          </thead>
          <tbody className={landingCss.overviewTbody}>
            <tr>
              <td>
                <span className={landingCss.overviewFade}>
                  <span className={landingCss.overviewNumber}>
                    {data?.overview.places.toString()}
                  </span>
                  <span className={landingCss.overviewText}>개</span>
                </span>
              </td>
              <td>
                <span className={landingCss.overviewFade}>
                  <span className={landingCss.overviewNumber}>
                    {data?.overview.plans.toString()}
                  </span>
                  <span className={landingCss.overviewText}>개</span>
                </span>
              </td>
              <td>
                <span className={landingCss.overviewFade}>
                  <span className={landingCss.overviewNumber}>
                    {data?.overview.users.toString()}
                  </span>
                  <span className={landingCss.overviewText}>명</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

interface HomePageProps {
  plans: {
    new: Plans[];
    like: Plans[];
  };
  overview: {
    users: Number;
    plans: Number;
    places: Number;
  };
}

type sortType = 'like' | 'new';
export default HomePage;
