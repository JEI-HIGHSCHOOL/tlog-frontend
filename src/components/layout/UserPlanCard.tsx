import request from '@/utils/ApiClient';
import * as React from 'react';
import { Plans, SearchLocation } from 'types';
import { Plan, UserPlans } from 'types/Plan';

const UserPlanCard: React.FC<UserPlanCardProps> = ({ plan }) => {
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('img', uploadFile);
      request(
        'POST',
        `/plans/${plan.id}/${plan.plans[0].id}/image`,
        formData
      ).then((res) => {
        console.log(res);
      });
      console.log(uploadFile);
    }
  };
  return (
    <>
      {' '}
      <input
        type='file'
        id='profile-upload'
        accept='image/*'
        onChange={onChangeImg}
      />
    </>
  );
};

interface UserPlanCardProps {
  plan: Plans;
}
export default UserPlanCard;
