import request from '@/utils/ApiClient';
import * as React from 'react';
import { Plans, SearchLocation, User } from 'types';
import { Plan, UserPlans } from 'types/Plan';
import moment from 'moment';
import ToolTip from '../ToolTip';
import Constants from "@/utils/Constants"
import Toast from '@/utils/Toast';
import { CopyToClipboard } from "react-copy-to-clipboard"
import config from "@/utils/Constants"

const UserPlanCard: React.FC<UserPlanCardProps> = ({ plan, owner }) => {
  return (
    <>
      <div className='border p-3 rounded-md'>
        
      </div>
    </>
  );
};

interface UserPlanCardProps {
  plan: Plans;
  owner?: User;
}
export default UserPlanCard;
