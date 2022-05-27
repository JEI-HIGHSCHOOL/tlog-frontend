import ErrorPage from '@/components/Error';
import * as React from 'react';

const NotFoundPage: React.FC = () => {
  return <ErrorPage message='찾을 수 없는 페이지' />;
};

export default NotFoundPage;
