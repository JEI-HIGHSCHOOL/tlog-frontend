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
import cardCss from "@/styles/planCard.module.css"
import Slider from "react-simple-image-slider"

const UserPlanCard: React.FC<UserPlanCardProps> = ({ plan, owner }) => {
  const images: string[] = []
  plan.plans.forEach((plan) => {
    plan.planImage?.forEach((image) => {
      images.push(image.imageUrl)
    })
  })
  return (
    <>
      <div className={cardCss.planCardBody}>
        <div>
          {images.length === 0 ? (<></>) : (<></>)}
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
