import clsxm from '@/lib/clsxm';
import { useRouter } from 'next/router';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { SearchLocation } from 'types';
import Layout from './layout/Layout';
import ArrowLink from './links/ArrowLink';
import Seo from './Seo';

const ErrorPage: React.FC<ErrorPageProps> = ({ message, status }) => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <Seo templateTitle={message} />
         <main>
          <section className='bg-white'>
            <div
              className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'
              style={{ fontFamily: 'LeeSeoyun' }}
            >
              <RiAlarmWarningFill
                size={60}
                className='drop-shadow-glow animate-flicker text-red-500'
              />
              <h1 className='mt-8 text-3xl tracking-tight md:text-5xl'>
                {message}
              </h1>
              <button
                className='mt-2 flex transform items-center text-xl transition duration-100 ease-in hover:-translate-y-1'
                onClick={() => router.back()}
              >
                이전 페이지로
                <i className='fas fa-angle-right ml-1 items-center text-sm' />
              </button>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

interface ErrorPageProps {
  message: string;
  status?: number;
}

export default ErrorPage;
