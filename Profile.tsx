
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [message, setMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, name, lastName }));
    setMessage('اطلاعات با موفقیت ذخیره شد!');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">پروفایل کاربری</h1>
        <p className="text-center text-gray-500 mb-6">اطلاعات خود را برای دریافت تخفیف‌ها وارد کنید.</p>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">نام</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام خود را وارد کنید"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">نام خانوادگی</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="نام خانوادگی خود را وارد کنید"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
           <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">شماره موبایل</label>
            <input
              id="phone"
              type="text"
              value={user.phone}
              disabled
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              ذخیره اطلاعات
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        <button onClick={() => navigate(-1)} className="w-full mt-4 text-center text-sm text-purple-600 hover:underline">
          بازگشت به داشبورد
        </button>
      </div>
    </div>
  );
};

export default Profile;
