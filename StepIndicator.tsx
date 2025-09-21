import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.MODEL_UPLOAD, label: 'آپلود عکس مدل' },
  { id: AppStep.CLOTHING_UPLOAD, label: 'آپلود عکس لباس' },
  { id: AppStep.RESULT, label: 'مشاهده نتیجه' }
];

const Step: React.FC<{ label: string; isActive: boolean; isCompleted: boolean }> = ({ label, isActive, isCompleted }) => {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300";
  const activeClasses = "bg-indigo-600 text-white shadow-lg scale-110";
  const completedClasses = "bg-green-500 text-white";
  const inactiveClasses = "bg-gray-200 text-gray-500";

  let statusClasses = inactiveClasses;
  if (isActive) {
    statusClasses = activeClasses;
  } else if (isCompleted) {
    statusClasses = completedClasses;
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`${baseClasses} ${statusClasses}`}>
        {isCompleted && !isActive ? '✔' : ''}
      </div>
      <p className={`mt-2 text-sm text-center ${isActive ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
};


const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
    const activeIndex = steps.findIndex(step => 
        step.id === currentStep || (currentStep === AppStep.GENERATING && step.id === AppStep.RESULT)
    );

  return (
    <div className="w-full mb-8 md:mb-12">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Step 
              label={step.label} 
              isActive={index === activeIndex} 
              isCompleted={index < activeIndex}
            />
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 self-start mt-4 ${index < activeIndex ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;