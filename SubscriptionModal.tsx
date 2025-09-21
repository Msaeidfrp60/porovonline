import React, { useState } from 'react';
import Button from './Button';

interface SubscriptionModalProps {
    onClose: () => void;
    onSubscribe: () => void;
}

const plans = [
    { name: 'یک ماهه', price: '120,000', period: 'تومان', description: 'محدودیت ۱۰۰ عکس', highlight: false },
    { name: 'شش ماهه', price: '500,000', period: 'تومان', description: 'محدودیت ۷۰۰ عکس', highlight: false },
    { name: 'یک ساله', price: '1,990,000', period: 'تومان', description: 'آپلود نامحدود', highlight: true, tag: 'به‌صرفه‌ترین' },
]

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onSubscribe }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubscribeClick = () => {
        setIsLoading(true);
        // Simulate API call to payment gateway
        setTimeout(() => {
            onSubscribe();
            setIsLoading(false);
            onClose();
        }, 2000);
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                    <h2 className="text-2xl font-bold mb-4">در حال انتقال به درگاه پرداخت...</h2>
                    <p>لطفاً منتظر بمانید.</p>
                </div>
            </div>
        )
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                     <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                        🚫 شما به محدودیت آپلود رایگان رسیدید!
                     </h2>
                     <p className="text-gray-600 mb-8">برای ادامه استفاده، لطفاً یکی از پلن‌های اشتراک ما را خریداری کنید.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map(plan => (
                         <div key={plan.name} className={`relative p-6 rounded-lg border-2 text-center transition-transform transform hover:-translate-y-2 ${plan.highlight ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
                            {plan.tag && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">{plan.tag}</div>}
                            <h3 className="text-2xl font-semibold mt-2 mb-2">{plan.name}</h3>
                            <p className="text-4xl font-bold mb-1">{plan.price}</p>
                            <p className="text-gray-500 mb-4">{plan.period}</p>
                            <p className="text-gray-700 font-medium h-10 mb-4 flex items-center justify-center">{plan.description}</p>
                            <Button onClick={handleSubscribeClick} variant={plan.highlight ? 'primary' : 'outline'}>
                                انتخاب پلن
                            </Button>
                        </div>
                    ))}
                </div>

                 <div className="text-center mt-8">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        فعلاً نه
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
