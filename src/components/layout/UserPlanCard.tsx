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

const UserPlanCard: React.FC<UserPlanCardProps> = ({ plan, owner }) => {
  return (
    <>
      <div className='rounded-md border p-3'>
        <div className='flex justify-between'>
          <div className='flex flex-row flex-wrap items-baseline'>
            <h1 className='mr-1 text-2xl'>{plan.title}</h1>
            <h2>{moment(plan.createdAt).fromNow()}생성</h2>
          </div>
          <div className='flex items-center'>
            {plan.share ? (
              <>
                <CopyToClipboard
                  text={config.BASE_DOMAIN + '/plans/' + plan.id}
                  onCopy={(text, isCopy) => {
                    if (isCopy) {
                      Toast('공유 링크가 성공적으로 복사되었습니다', 'success');
                    }
                  }}
                >
                  <button>
                    <ToolTip text='공유됨'>
                      <i className='fas fa-share' />
                    </ToolTip>
                  </button>
                </CopyToClipboard>
              </>
            ) : null}
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
