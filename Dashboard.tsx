
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HangerIcon from './icons/HangerIcon';
import { useUser } from '../contexts/UserContext';
import SubscriptionPopup from './SubscriptionPopup';
import { generateVirtualTryOn } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileToBase64';

type Step = 1 | 2 | 'loading' | 'result';

const ImageUpload: React.FC<{ onFileSelect: (file: File) => void, title: string, description: string }> = ({ onFileSelect, title, description }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };
    
    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    انتخاب فایل
                </button>
                <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleFileChange}
                    className="hidden"
                    id="camera-input"
                />
                 <label htmlFor="camera-input" className="cursor-pointer w-full px-4 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    گرفتن عکس با دوربین
                </label>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
  const { user, setUser, logout } = useUser();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<Step>(1);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [clothFile, setClothFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);

  const handleCreateTryOn = async () => {
    if (!modelFile || !clothFile) {
      setError('لطفاً هر دو عکس را آپلود کنید');
      return;
    }

    if (user.uploadsUsed >= 10 && user.subscriptionTier === 'none') {
      setShowPopup(true);
      return;
    }
    
    setError('');
    setStep('loading');

    try {
        const modelBase64 = await fileToBase64(modelFile);
        const clothBase64 = await fileToBase64(clothFile);

        const result = await generateVirtualTryOn(
            { base64: modelBase64, mimeType: modelFile.type },
            { base64: clothBase64, mimeType: clothFile.type }
        );

        if (result.imageBase64) {
            setResultImage(`data:image/png;base64,${result.imageBase64}`);
            setResultText(result.text);
            setUser(prev => ({ ...prev, uploadsUsed: prev.uploadsUsed + 1 }));
            setStep('result');
        } else {
            throw new Error("نتیجه‌ای دریافت نشد.");
        }
    } catch (err: any) {
        setError(err.message || 'خطا در ایجاد پرو مجازی');
        setStep(2);
    }
  };
  
  const resetProcess = () => {
      setStep(1);
      setModelFile(null);
      setClothFile(null);
      setResultImage(null);
      setResultText(null);
      setError('');
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
             <div className="flex items-center gap-3">
                 <HangerIcon className="w-10 h-10 text-purple-600" />
                 <div>
                     <h1 className="text-xl font-bold text-purple-700">پرو مجازی</h1>
                     <h2 className="text-sm text-gray-500">داشبورد</h2>
                 </div>
             </div>
             <button onClick={logout} className="text-sm text-gray-600 hover:text-purple-600">خروج از حساب</button>
        </header>

        <main className="p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="space-y-6">
                {step === 1 && (
                     <ImageUpload
                        title="مرحله ۱: عکس خود را وارد کنید"
                        description="یک عکس واضح از روبرو که تمام بدن شما مشخص باشد آپلود کنید."
                        onFileSelect={(file) => {
                            setModelFile(file);
                            setStep(2);
                        }}
                    />
                )}
                {step === 2 && (
                    <>
                        <div className="p-4 bg-green-100 border border-green-300 rounded-lg flex justify-between items-center">
                            <span className="text-green-800 font-medium">عکس مدل با موفقیت آپلود شد.</span>
                            <button onClick={() => setStep(1)} className="text-sm text-purple-600 hover:underline">تغییر عکس</button>
                        </div>
                        <ImageUpload
                            title="مرحله ۲: عکس لباس خود را وارد کنید"
                            description="عکس با پس‌زمینه ساده از لباس مورد نظر را انتخاب کنید."
                            onFileSelect={setClothFile}
                        />
                        {clothFile && (
                             <button onClick={handleCreateTryOn} className="w-full mt-4 px-4 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                                ایجاد پرو مجازی
                            </button>
                        )}
                    </>
                )}
                
                {step === 'loading' && (
                    <div className="text-center p-10 bg-white rounded-lg shadow-sm">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">در حال ایجاد پرو مجازی شما... این فرآیند ممکن است کمی طول بکشد.</p>
                    </div>
                )}

                {step === 'result' && resultImage && (
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">نتیجه پرو مجازی</h3>
                        <img src={resultImage} alt="Virtual try-on result" className="rounded-lg shadow-lg mx-auto max-w-full h-auto" />
                        {resultText && <p className="mt-4 text-gray-600">{resultText}</p>}
                        <button onClick={resetProcess} className="mt-6 px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                            ایجاد یک پرو جدید
                        </button>
                    </div>
                )}

                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-8">
                     <div onClick={() => navigate('/subscription')} className="p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-800">اشتراک</h3>
                        <p className="text-xs text-gray-500">پلن خود را مدیریت کنید</p>
                    </div>
                    <div onClick={() => navigate('/support')} className="p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-800">پشتیبانی</h3>
                        <p className="text-xs text-gray-500">با ما در تماس باشید</p>
                    </div>
                    <div onClick={() => navigate('/profile')} className="p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-800">پروفایل</h3>
                        <p className="text-xs text-gray-500">اطلاعات خود را ویرایش کنید</p>
                    </div>
                </div>

            </div>
        </main>

        {showPopup && <SubscriptionPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Dashboard;
