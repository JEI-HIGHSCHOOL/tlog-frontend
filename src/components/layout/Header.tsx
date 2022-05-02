import React, { useEffect, useState, Fragment } from 'react';
import clinet from '@/utils/ApiClient';
import { Menu, Transition } from '@headlessui/react';
import UnstyledLink from '@/components/links/UnstyledLink';
import Link from 'next/link';
import { setCookie } from '@/utils/utils';
import { useRouter } from 'next/router';
import Toast from '@/utils/Toast';
import Logo from '~/images/logo.png';

const links = [
  { href: '/', label: 'Route 1' },
  { href: '/register', label: 'Route 2' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [navBarOpen, setNavBarOpen] = useState<boolean>();

  const OnclickNavBarOpen = () => {
    if (navBarOpen) {
      setNavBarOpen(false);
    } else {
      setNavBarOpen(true);
    }
  };

  useEffect(() => {
    clinet('GET', '/auth/me').then((data) => {
      if (data.status !== 200) return;
      setUser(data.data);
    });
  }, []);

  const logout = async () => {
    setUser(null);
    setCookie('Authorization', '1', {
      maxAge: 1,
    });
    window.location.href = router.asPath;
    Toast('로그아웃 되었습니다.', 'success');
  };
  return (
    <>
      <nav
        className='stiky top-0 z-40 flex w-full flex-wrap items-center border-b border-gray-900/10 px-5 py-2 text-gray-100 backdrop-blur'
        onClick={() => OnclickNavBarOpen()}
      >
        <div className='container mx-auto flex flex-wrap items-center justify-between px-4'>
          <div className='mr-6 flex flex-shrink-0 items-center text-white'>
            <Link href='/'>
              <a className='flex items-center'>
                <img className='-ml-3 w-32' src='/images/logo_sm.png' />
              </a>
            </Link>
          </div>
          <div className='block lg:hidden'>
            <button
              className='flex items-center items-center rounded border px-3 py-2 text-gray-700'
              onClick={() => OnclickNavBarOpen()}
            >
              <svg
                className='h-3 w-3 fill-current'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>메뉴</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>
          <div
            className={
              'block w-full flex-grow lg:flex lg:w-auto lg:items-center' +
              (navBarOpen ? ' flex' : ' hidden')
            }
          >
            <div className='w-full text-sm lg:flex lg:flex-wrap lg:items-center lg:justify-between'>
              <div>
                {links.map(({ label, href }) => (
                  <Link href={href} key={label + href}>
                    <a className='mt-4 block rounded-lg px-3 py-2 font-medium text-gray-700 hover:text-sky-500 hover:underline hover:underline-offset-4 sm:text-lg lg:mt-0 lg:inline-block'>
                      {label}
                    </a>
                  </Link>
                ))}
              </div>
              <div>
                {user ? (
                  <>
                    <Menu as='div' className='relative ml-3 text-black'>
                      <div className='text-lg lg:text-xl'>
                        <Menu.Button>
                          {user.name}님
                          <i className='fas fa-caret-down ml-2 mt-5 pb-3  lg:mt-0 lg:pb-0' />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:right-0'>
                          <Menu.Item>
                            {({ active }) => (
                              <>
                                <Link href={`/me`}>
                                  <a className='flex items-center px-4 py-2'>
                                    <i className='fas fa-user mr-2' />
                                    <a
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block font-normal text-gray-700 hover:text-sky-500 hover:underline hover:underline-offset-4'
                                      )}
                                    >
                                      내 정보
                                    </a>
                                  </a>
                                </Link>
                                <button
                                  className='flex items-center px-4 py-2'
                                  onClick={() => logout()}
                                >
                                  <i className='fas fa-sign-out-alt mr-2' />
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block font-normal text-gray-700 hover:text-sky-500 hover:underline hover:underline-offset-4'
                                    )}
                                  >
                                    로그아웃
                                  </a>
                                </button>
                              </>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Link href='/login'>
                      <a className='mt-4 block rounded-lg px-3 py-2 text-lg font-medium text-gray-700 hover:text-sky-500 hover:underline hover:underline-offset-4 lg:mt-0 lg:inline-block'>
                        로그인
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
