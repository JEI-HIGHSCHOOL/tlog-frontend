import * as React from 'react';
import { Plan, SearchLocation } from 'types';

const PlanCard: React.FC<PlanCardProps> = ({ location, deletePlan }) => {
  const deletePlanHandler = () => {
    deletePlan(location.id);
  };
  const viewRoadView = () => {
    window.open(`	https://map.kakao.com/link/roadview/${location.place_id}`);
  };
  const findWays = () => {
    window.open(`https://map.kakao.com/link/map/${location.place_id}`);
  };
  return (
    <>
      <div className=' transform rounded-lg shadow-lg transition duration-100 ease-in hover:-translate-y-1'>
        <div className='flex items-center justify-between rounded-t-lg bg-[#eeee] p-2 text-xl'>
          {location.place_name}
          <div className='space-x-2'>
            <i
              className='fas fa-map-signs text-green-300 hover:text-green-700'
              onClick={() => {
                findWays();
              }}
            />
            <i
              className='fas fa-car text-blue-300 hover:text-blue-700'
              onClick={() => {
                viewRoadView();
              }}
            />
            <i
              className='fas fa-ban text-red-300 hover:text-red-700'
              onClick={() => {
                deletePlanHandler();
              }}
            />
          </div>
        </div>
        <div className='flex w-full flex-col rounded-b-lg border px-2 py-4'>
          {!location.place_address && !location.place_phone && (
            <div className='text-lg'>정보없음</div>
          )}
          {location.place_address && (
            <div className='text-lg'>주소 - {location.place_address}</div>
          )}
          {location.place_phone && (
            <div className='text-[#888]'>전화번호 - {location.place_phone}</div>
          )}
        </div>
      </div>
    </>
  );
};

interface PlanCardProps {
  location: Plan;
  deletePlan: (id: string) => void;
}

export default PlanCard;
