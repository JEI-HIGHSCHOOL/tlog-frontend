import request from '@/utils/ApiClient';
import * as React from 'react';
import { Plans, SearchLocation, User } from 'types';
import { Plan, UserPlans } from 'types/Plan';
import moment from 'moment';
import ToolTip from '../ToolTip';
import Constants from '@/utils/Constants';
import Toast from '@/utils/Toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from '@/utils/Constants';
import cardCss from '@/styles/planCard.module.css';
import Slider from 'react-simple-image-slider';
import { formatNumber } from '@/utils/Fotmenter';
import Link from 'next/link';

const UserPlanCard: React.FC<UserPlanCardProps> = ({ plan, owner }) => {
  const images: string[] = [];
  plan.plans.forEach((plan) => {
    plan.planImage?.forEach((image) => {
      images.push(Constants.CLOUD_FRONT + '/' + image.imageUrl);
    });
  });
  return (
    <>
      <Link href={`/plans/${plan.id}`}>
        <div className={cardCss.planCardBody}>
          <div className={cardCss.planCardImgBody}>
            {images.length === 0 ? (
              <>
                <div
                  style={{
                    backgroundImage: 'url(/images/logo_sm.png)',
                  }}
                  className={cardCss.planCardImg}
                />
              </>
            ) : (
              <>
                <div
                  style={{
                    backgroundImage: `url(${
                      images[Math.floor(Math.random() * images.length)]
                    })`,
                  }}
                  className={cardCss.planCardImg}
                />
              </>
            )}
          </div>
          <div className={cardCss.planCardDetailBody}>
            <span className={cardCss.planCardDetailTitle}>{plan.title}</span>
            <span className={cardCss.planCardDetailOwner}>
              {plan.owner?.name}
            </span>
            <span className={cardCss.planCardDetailDescription}>
              좋아요 {formatNumber(plan.like)}개
              <span style={{ margin: '0 4px' }}>•</span>
              {moment(plan.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

interface UserPlanCardProps {
  plan: Plans;
  owner?: User;
}
export default UserPlanCard;
