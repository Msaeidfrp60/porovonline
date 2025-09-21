
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HangerIcon from './icons/HangerIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import PhoneIcon from './icons/PhoneIcon';
import { useUser } from '../contexts/UserContext';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.match(/^\d{10}$/)) {
      setError('شماره موبایل باید ۱۰ رقم بدون صفر باشد');
      return;
    }
    setError('');
    setIsLoading(true);

    // Mock API call for sending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`OTP for +98${phone} would be: 123456`); // Mock OTP

    setIsLoading(false);
    setStep(2);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('کد وارد شده صحیح نیست');
      return;
    }
    setError('');
    setIsLoading(true);

    // Mock API call for verifying OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isSuccess = otp === '123456'; // Mock verification

    setIsLoading(false);
    if (isSuccess) {
      setUser({
        isLoggedIn: true,
        phone: `+98${phone}`,
        name: 'کاربر',
        lastName: 'جدید',
        uploadsUsed: 0,
        subscriptionTier: 'none',
        subscriptionEndDate: null
      });
      navigate('/');
    } else {
      setError('کد وارد شده اشتباه است');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="mx-auto w-24 h-24 text-purple-600">
          <HangerIcon className="w-full h-full" />
        </div>
        
        <h1 className="text-3xl font-bold text-purple-700 mt-4">پرو مجازی</h1>
        <p className="text-gray-600 mt-2">لباس های خود را قبل از خرید، به صورت مجازی امتحان کنید.</p>
        <p className="text-gray-500 mt-1">قبل از مهمانی لباس های خود را پرو کنید.</p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="mt-8">
            <div className="relative">
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={10}
                className="w-full px-4 py-3 text-lg text-black bg-white border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="9123456789"
                dir="ltr"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">+98</span>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 mt-4 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-300"
            >
              {isLoading ? 'در حال ارسال...' : 'ارسال کد'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="mt-8">
            <p className="text-gray-600 mb-2">کد تایید به شماره <span className="font-semibold" dir="ltr">+98 {phone}</span> ارسال شد.</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={6}
              className="w-full px-4 py-3 text-2xl tracking-[.5em] text-center text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="------"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 px-4 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-300"
            >
              {isLoading ? 'در حال بررسی...' : 'ورود'}
            </button>
             <button
              type="button"
              onClick={() => { setStep(1); setError(''); setOtp(''); }}
              className="mt-2 text-sm text-purple-600 hover:underline"
            >
              ویرایش شماره موبایل
            </button>
          </form>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        
        <div className="mt-12 text-center text-gray-500 border-t pt-6">
          <p className="font-semibold mb-2">پشتیبانی</p>
          <p className="text-xs">در صورت بروز هرگونه مشکل یا سوال، می‌توانید از طریق راه‌های زیر با ما در تماس باشید.</p>
          <div className="flex justify-center items-center space-x-6 space-x-reverse mt-4">
            <a href="https://wa.me/989120137032" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-green-500 hover:text-green-600">
              <WhatsAppIcon className="w-8 h-8"/>
              <span className="text-xs mt-1">واتس‌اپ</span>
            </a>
            <a href="tel:+989120137032" className="flex flex-col items-center text-blue-500 hover:text-blue-600">
              <PhoneIcon className="w-8 h-8" />
               <span className="text-xs mt-1">تماس</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
