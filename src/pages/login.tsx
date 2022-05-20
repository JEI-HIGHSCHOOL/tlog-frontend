import Button from '@/components/buttons/Button';
import Input from '@/components/input/input';
import Client from '@/utils/ApiClient';
import Toast from '@/utils/Toast';
import { checkEamil, setCookie } from '@/utils/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import loginCss from '@/styles/login.module.css';
import Link from 'next/link';
export default function RegisterPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const router = useRouter();

  const login = async () => {
    if (!email) return Toast('이메일을 입력해주세요.', 'error');
    if (!password) return Toast('비밀번호를 입력해주세요.', 'error');
    await Client('POST', '/auth/login', {
      email,
      password,
    }).then((data) => {
      if (data.status !== 200) {
        Toast(data.message, 'error');
      } else {
        setCookie('Authorization', data.data.token, {
          maxAge: data.data.expiresIn,
        });
        window.location.href = '/';
        Toast(data.message, 'success');
      }
    });
  };

  const loginNaver = async () => {};

  return (
    <section
      className='container flex min-h-[100vh] w-full flex-col items-center justify-center'
      style={{ fontFamily: 'LeeSeoyun' }}
    >
      <h1 className='text-4xl'>로그인</h1>
      <div className='mt-3 w-full max-w-sm'>
        <h1 className='mt-5 text-xl'>이메일</h1>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='이메일'
          type='email'
        />
        <h1 className='mt-2 text-xl'>비밀번호</h1>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호'
          type='password'
        />
        <div className='my-7' />
        <Button placeholder='로그인' onClick={() => login()} />
        <h1 className='mt-2 flex items-center justify-center'>
          회원이 아니신가요?
          <Link href={'/register'}>
            <a className='ml-1 underline underline-offset-4'>회원가입</a>
          </Link>
        </h1>
        <hr className='my-5 w-full border' />
        <div className='flex items-center justify-center'>
          <button
            className={loginCss.socialLogin}
            style={{ background: '#1FC700' }}
            onClick={() => loginNaver()}
          >
            <i className='xi-2x xi-naver' />
          </button>
          <button
            className={loginCss.socialLogin}
            style={{ background: '#FFEB00' }}
            onClick={(e) => {
              loginNaver();
            }}
          >
            <i className='xi-2x xi-kakaotalk text-dark'></i>
          </button>
        </div>
      </div>
    </section>
  );
}
