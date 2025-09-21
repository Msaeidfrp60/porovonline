
import React from 'react';
import Button from './Button';

interface ResultDisplayProps {
  resultImage: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, onReset }) => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">نتیجه پرو مجازی شما!</h2>
      <div className="relative inline-block">
        <img 
            src={resultImage} 
            alt="Virtual try-on result" 
            className="rounded-xl shadow-2xl max-w-full h-auto mx-auto border-4 border-white"
            style={{ maxHeight: '70vh' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl pointer-events-none"></div>
      </div>
      <div className="mt-8">
        <Button onClick={onReset} variant="secondary">
          امتحان دوباره
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;
