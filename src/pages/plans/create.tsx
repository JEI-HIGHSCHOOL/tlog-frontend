import Button from '@/components/buttons/Button';
import Input from '@/components/input/input';
import Card from '@/components/layout/Card';
import Layout from '@/components/layout/Layout';
import PlanCard from '@/components/layout/PlanCard';
import NextImage from '@/components/NextImage';
import Skeleton from '@/components/Skeleton';
import request from '@/utils/ApiClient';
import Toast from '@/utils/Toast';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function NewPlansPage() {
  const [geolocation, setGeolocation] = useState<Geolocation>();
  const [placeName, setPlaceName] = useState<string>();
  const [places, setPlaces] = useState<SearchLocation[]>();
  const [nowPlace, setNowPlace] = useState<number>(0);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [planList, setPlanList] = useState<SearchLocation[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          setGeolocation({
            lat: 37.5661,
            lng: 126.9779,
          });
        }
      ),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        };
    }
  }, []);

  const findPlaces = async () => {
    if (!placeName) return Toast('장소를 입력해주세요.', 'error');
    const placeSearch = new kakao.maps.services.Places();
    placeSearch.keywordSearch(placeName, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setNowPlace(0);
        let places: SearchLocation[] = [];
        data.forEach((searchLocation) => {
          places.push({
            id: searchLocation.id,
            latitude: Number(searchLocation.x),
            longitude: Number(searchLocation.y),
            place_name: searchLocation.place_name,
            place_phone: searchLocation.phone,
            place_category_group_name: searchLocation.category_group_name,
            place_address: searchLocation.road_address_name,
          });
        });
        setPlaces(places);
        NextPlaces();
      } else {
        Toast('해당 장소를 찾을 수 없습니다.', 'error');
      }
    });
  };

  const NextPlaces = async () => {
    if (!map) return;
    if (!places || places.length === 0)
      return Toast('장소를 먼저 검색해주세요.', 'error');
    if (nowPlace + 1 >= places.length)
      return Toast('더 이상 장소가 없습니다.', 'error');
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      new kakao.maps.LatLng(
        places[nowPlace].longitude,
        places[nowPlace].latitude
      )
    );
    map.setBounds(bounds);
    setNowPlace((nowIndex) => nowIndex + 1);
  };

  const addPlan = async () => {
    if (!places || places.length === 0)
      return Toast('장소를 먼저 검색해주세요.', 'error');

    if (planList.find((plan) => plan.id == places[nowPlace].id))
      return Toast('이미 추가된 장소입니다.', 'error');
    console.log(planList);
    setPlanList((planList) => [...planList, places[nowPlace]]);
    Toast(`${places[nowPlace].place_name}이(가) 추가되었습니다.`, 'success');
  };

  const deletePlan = (id: string) => {
    Toast(
      `${
        planList.find((plan) => plan.id === id)?.place_name
      }이(가) 삭제되었습니다.`,
      'success'
    );
    setPlanList((planList) => planList.filter((plan) => plan.id != id));
  };

  const savePlanList = async () => {
    request('POST', '/plans/create', {
      plans: planList,
    }).then((data) => {
      if (data.status !== 200) {
        Toast(data.message, 'error');
      } else {
        Toast(data.message, 'success');
      }
    });
  };

  return (
    <>
      <section
        className='container mx-auto'
        style={{ fontFamily: 'LeeSeoyun' }}
      >
        <h1 className='mx-auto mb-5 flex justify-center text-4xl'>
          여행계획 만들기
        </h1>
        <span className='text-2xl'>방문할 장소</span>
        <div className='mb-2 flex flex-row'>
          <Input
            placeholder='홍대 CGV'
            onChange={(e) => {
              setPlaceName(e.target.value);
            }}
          />
          <Button
            placeholder='검색'
            onClick={() => {
              findPlaces();
            }}
            className='ml-2 w-48'
          />
        </div>
        {places ? (
          <Map // 지도를 표시할 Container
            center={{
              lat: places[nowPlace].longitude,
              lng: places[nowPlace].latitude,
            }}
            style={{
              // 지도의 크기
              width: '100%',
              height: '400px',
            }}
            className='rounded-lg'
            level={7} // 지도의 확대 레벨
            onCreate={setMap}
          >
            <MapMarker
              position={{
                lat: places[nowPlace].longitude,
                lng: places[nowPlace].latitude,
              }}
            >
              <div className='map-wrap'>
                <div className='info'>
                  <div className='title'>{places[nowPlace].place_name}</div>
                  <div className='body'>
                    <div className='desc'>
                      <div className='ellipsis'>
                        {places[nowPlace].place_address}
                      </div>
                      <div className='jibun ellipsis'>
                        {places[nowPlace].place_phone && (
                          <>전화번호 - {places[nowPlace].place_phone}</>
                        )}
                        {!places[nowPlace].place_phone &&
                          !places[nowPlace].place_address && <>정보없음</>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MapMarker>
          </Map>
        ) : (
          <Skeleton
            style={{ width: '100%', height: '450px' }}
            className='rounded-lg'
            placeholder='추가할 장소를 검색해주세요!'
          />
        )}
        <div className='ml-auto mt-3 flex flex-row'>
          <Button
            placeholder='이곳이 아니에요!'
            onClick={() => {
              NextPlaces();
            }}
            className='ml-auto w-32'
            type='cancel'
          />
          <Button
            placeholder='추가하기'
            onClick={() => {
              addPlan();
            }}
            className='ml-2 w-32'
            type='success'
          />
        </div>
      </section>
      <section
        className='container mx-auto mt-10 flex h-full min-h-[50vh] w-full flex-col'
        style={{ fontFamily: 'LeeSeoyun' }}
      >
        <h1 className='mt-5 mb-3 text-4xl'>추가된 계획목록</h1>

        {planList.length === 0 ? (
          <div className='min my-auto flex h-full flex-col items-center justify-center text-2xl'>
            <span>추가된 계획이 없습니다</span>
            <span>계획을 추가해보세요!</span>
          </div>
        ) : (
          <div className='space-y-5'>
            {planList.map((plan) => (
              <PlanCard location={plan} key={plan.id} deletePlan={deletePlan} />
            ))}
          </div>
        )}
        <Button
          placeholder='저장하기'
          type='success'
          className='mt-12'
          onClick={() => {
            savePlanList();
          }}
        />
      </section>
    </>
  );
}

interface Geolocation {
  lat: number;
  lng: number;
}

export interface SearchLocation {
  id: string;
  latitude: number;
  longitude: number;
  place_name: string;
  place_phone: string;
  place_category_group_name: string;
  place_address: string;
}
