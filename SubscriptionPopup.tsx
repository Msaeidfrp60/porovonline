
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPopupProps {
  onClose: () => void;
}

const SubscriptionPopup: React.FC<SubscriptionPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/subscription');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full text-center p-6">
        <h2 className="text-xl font-bold text-gray-800">محدودیت استفاده رایگان شما تمام شد!</h2>
        <p className="mt-2 text-gray-600">برای ادامه استفاده از پرو مجازی و دسترسی به امکانات بیشتر، لطفاً یکی از پلن‌های اشتراک ما را خریداری کنید.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleNavigate}
            className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            مشاهده پلن‌های اشتراک
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
