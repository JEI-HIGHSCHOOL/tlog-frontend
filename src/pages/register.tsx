import Button from '@/components/buttons/Button';
import Input from '@/components/input/input';
import Client from '@/utils/ApiClient';
import Toast from '@/utils/Toast';
import { checkEamil } from '@/utils/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordCheck, setPasswordCheck] = useState<string>();
  const [passwordCheckStatus, setPasswordCheckStatus] = useState<boolean>();
  const [emailVerifyId, setEmailVerifyId] = useState<number>();
  const [emailVerifyCode, setEmailVerifyCode] = useState<string>();
  const [emailVerifyed, setEmailVerifyed] = useState<boolean>();

  const router = useRouter();

  useEffect(() => {
    if (!passwordCheck || !password) return setPasswordCheckStatus(false);
    if (passwordCheck === password) {
      setPasswordCheckStatus(true);
    } else {
      setPasswordCheckStatus(false);
    }
  }, [passwordCheck, password]);

  const emailVerifyHandler = async () => {
    if (!email) return Toast('이메일을 입력해주세요.', 'error');
    if (!checkEamil(email))
      return Toast('이메일 형식이 올바르지 않습니다.', 'error');
    await Client('POST', '/auth/verify', { email }).then((data) => {
      if (data.status !== 200) {
        Toast(data.message, 'error');
      } else {
        Toast(data.message, 'success');
        setEmailVerifyId(data.data);
      }
    });
  };

  const emailVerify = async () => {
    if (!emailVerifyCode) return Toast('인증번호를 입력해주세요!', 'error');
    await Client('POST', '/auth/verifycheck', {
      id: emailVerifyId?.toString(),
      token: emailVerifyCode,
    }).then((data) => {
      if (data.status !== 200) {
        Toast(data.message, 'error');
      } else {
        Toast(data.message, 'success');
        setEmailVerifyed(true);
        setEmailVerifyId(undefined);
      }
    });
  };

  const register = async () => {
    if (!name) return Toast('이름을 입력해주세요.', 'error');
    if (!emailVerifyed) return Toast('이메일을 인증해주세요.', 'error');
    if (!password) return Toast('비밀번호를 입력해주세요.', 'error');
    if (!passwordCheckStatus)
      return Toast('비밀번호가 일치하지 않습니다.', 'error');
    await Client('POST', '/auth/signup', {
      email,
      password,
      name,
    }).then((data) => {
      if (data.status !== 200) {
        Toast(data.message, 'error');
      } else {
        Toast(data.message, 'success');
        router.push('/login');
      }
    });
  };

  return (
    <section className='container flex min-h-[100vh] w-full flex-col items-center justify-center'>
      <h1 className='text-4xl'>회원가입</h1>
      <div className='mt-3 w-full max-w-sm'>
        <h1 className='text-xl'>이름</h1>
        <Input onChange={(e) => setName(e.target.value)} placeholder='이름' />
        <h1 className='mt-5 text-xl'>이메일</h1>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='이메일'
          type='email'
          disabled={emailVerifyId || emailVerifyed ? true : false}
        />
        {!emailVerifyId && !emailVerifyed && (
          <Button
            placeholder='이메일 인증'
            size='sm'
            disabled={emailVerifyId ? true : false}
            onClick={() => emailVerifyHandler()}
          />
        )}
        {emailVerifyId && (
          <>
            <Input
              onChange={(e) => setEmailVerifyCode(e.target.value)}
              placeholder='인증번호'
            />
            <Button
              placeholder='인증하기'
              size='sm'
              onClick={() => emailVerify()}
            />
          </>
        )}
        {emailVerifyed && (
          <h1 className={`mt-2 text-xl text-green-500`}>
            이메일 인증이 완료되었습니다
          </h1>
        )}
        <h1 className='mt-5 text-xl'>비밀번호</h1>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호'
          type='password'
        />
        <h1 className='mt-1 text-xl'>비밀번호 확인</h1>
        <Input
          onChange={(e) => setPasswordCheck(e.target.value)}
          placeholder='비밀번호 확인'
          type='password'
        />
        <h1
          className={`mt-2 text-xl ${
            passwordCheckStatus ? 'text-green-500' : 'text-red-600'
          }`}
        >
          {!passwordCheck || !password ? (
            '비밀번호를 입력해주세요'
          ) : (
            <>
              {passwordCheckStatus
                ? '비밀번호가 일치합니다'
                : '비밀번호가 일치하지 않습니다'}
            </>
          )}
        </h1>
        <hr className='my-5 w-full border' />
        <Button placeholder='회원가입' onClick={() => register()} />
      </div>
    </section>
  );
}
