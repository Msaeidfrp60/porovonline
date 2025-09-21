import React, { useState, useCallback, useRef } from 'react';
import Button from './Button';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
  title: string;
  description: string;
  id: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, title, description, id }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
     // Reset the input value to allow re-uploading the same file
    if(event.target) {
        event.target.value = '';
    }
  }, [onImageUpload]);
  
  const handleFileClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.removeAttribute('capture');
        fileInputRef.current.click();
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.setAttribute('capture', 'user');
        fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full p-6 border-2 border-gray-300 border-dashed rounded-lg text-center transition-all hover:border-indigo-500 hover:bg-indigo-50 animate-fade-in flex flex-col justify-between">
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">{description}</p>
            
            <input
                type="file"
                id={id}
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
            
            <div className="flex gap-2 justify-center">
                 <button
                    onClick={handleFileClick}
                    className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors"
                >
                    انتخاب فایل
                </button>
                 <button
                    onClick={handleCameraClick}
                    className="px-4 py-2 text-sm font-semibold text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                >
                    گرفتن عکس با دوربین
                </button>
            </div>
        </div>

        {preview && (
            <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2 truncate">{fileName}</p>
                <img src={preview} alt="Preview" className="max-h-40 rounded-md mx-auto shadow-md" />
            </div>
        )}
    </div>
  );
};

export default ImageUploader;
