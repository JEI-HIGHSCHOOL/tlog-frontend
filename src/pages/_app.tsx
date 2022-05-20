import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import '@/styles/globals.css';
import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/card.css';

import Header from '@/components/layout/Header';
import Seo from '@/components/Seo';
import config from '@/utils/Constants';

axios.defaults.baseURL = config.BASE_API_URL;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <Header />
      <div className='mt-24'>
        <Component {...pageProps} />
      </div>
      <ToastContainer />
    </>
  );
}

export default MyApp;
