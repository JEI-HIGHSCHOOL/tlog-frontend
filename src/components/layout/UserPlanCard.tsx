import request from '@/utils/ApiClient';
import * as React from 'react';
import { Plans, SearchLocation, User } from 'types';
import { Plan, UserPlans } from 'types/Plan';
import moment from 'moment';
import ToolTip from '../ToolTip';
import Constants from "@/utils/Constants"
import Toast from '@/utils/Toast';

const UserPlanCard: React.FC<UserPlanCardProps> = ({ plan, owner }) => {
  return (
    <>
      <div className='border p-3 rounded-md'>
        <div className='flex justify-between'>
          <div className='flex flex-row items-baseline flex-wrap'>
            <h1 className='text-2xl mr-1'>{plan.title}</h1>
            <h2>{moment(plan.createdAt).endOf('day').fromNow()}생성</h2>
          </div>
          <div className='flex items-center'>
            {plan.share ? <>
              <button>
                <ToolTip text='공유됨'>
                  <i className="fas fa-share"/>
                </ToolTip>
              </button>
            </> : null}
          </div>
        </div>
        
      </div>
    </>
  );
};

interface UserPlanCardProps {
  plan: Plans;
  owner?: User;
}
export default UserPlanCard;
