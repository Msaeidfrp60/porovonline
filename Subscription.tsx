
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionPlan } from '../types';

const plans: SubscriptionPlan[] = [
  {
    id: 'annually',
    name: 'یک ساله',
    duration: '۳۶۵ روز',
    price: '۱٬۹۹۰٬۰۰۰ تومان',
    uploadLimit: 'نامحدود',
    features: ['پشتیبانی کامل'],
    isBestseller: true,
  },
  {
    id: 'semi-annually',
    name: 'شش ماهه',
    duration: '۱۸۰ روز',
    price: '۵۰۰٬۰۰۰ تومان',
    uploadLimit: '۷۰۰ عکس',
    features: ['پشتیبانی کامل'],
  },
    {
    id: 'monthly',
    name: 'یک ماهه',
    duration: '۳۰ روزه',
    price: '۱۲۰٬۰۰۰ تومان',
    uploadLimit: '۱۰۰ عکس',
    features: ['پشتیبانی کامل'],
  },
];

const SubscriptionCard: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => {
    return (
        <div className={`relative flex flex-col p-6 bg-white rounded-lg shadow-lg border-2 ${plan.isBestseller ? 'border-purple-500' : 'border-gray-200'}`}>
            {plan.isBestseller && (
                <div className="absolute top-0 right-1/2 transform -translate-y-1/2 translate-x-1/2 px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                    پرفروش‌ترین
                </div>
            )}
            <h3 className="text-xl font-bold text-center">{plan.name}</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">{plan.duration}</p>
            <p className="mt-4 text-3xl font-extrabold text-center text-gray-900">{plan.price}</p>
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>محدودیت: {plan.uploadLimit}</span>
                </li>
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                       <span>✓</span>
                       <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={`mt-8 w-full py-2 px-4 rounded-md font-semibold ${plan.isBestseller ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 text-purple-700 hover:bg-gray-200'}`}>
                خرید و فعال سازی
            </button>
        </div>
    );
};

const Subscription: React.FC = () => {
  const [discountCode, setDiscountCode] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">پلن‌های اشتراک</h1>
          <p className="mt-4 text-lg text-gray-500">پلن مناسب خود را انتخاب کرده و استفاده نامحدود را تجربه کنید.</p>
        </div>
        
        <div className="mt-10 max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="کد تخفیف خود را وارد کنید (مثال: SALE20)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                 <button className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700">
                    اعمال
                </button>
            </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {plans.map(plan => <SubscriptionCard key={plan.id} plan={plan} />)}
        </div>
        
        <div className="text-center mt-12">
            <button onClick={() => navigate(-1)} className="text-sm text-purple-600 hover:underline">
                بازگشت به داشبورد
            </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
