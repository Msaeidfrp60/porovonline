
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from './icons/WhatsAppIcon';
import PhoneIcon from './icons/PhoneIcon';

const Support: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">پشتیبانی</h1>
        <p className="mt-2 text-gray-600">
          در صورت بروز هرگونه مشکل یا سوال، می‌توانید از طریق راه‌های زیر با ما در تماس باشید.
        </p>
        <div className="mt-8 space-y-4">
          <a
            href="https://wa.me/989120137032"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <WhatsAppIcon className="w-6 h-6" />
            <span>ارسال پیام در واتس‌اپ</span>
          </a>
          <a
            href="tel:+989120137032"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PhoneIcon className="w-6 h-6" />
            <span dir="ltr">تماس با 09120137032</span>
          </a>
        </div>
         <button onClick={() => navigate(-1)} className="w-full mt-8 text-center text-sm text-purple-600 hover:underline">
          بازگشت به داشبورد
        </button>
      </div>
    </div>
  );
};

export default Support;
