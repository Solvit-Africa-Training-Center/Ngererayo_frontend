import { Check } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [
    { number: 1, label: 'Account Creation', completed: true },
    { number: 2, label: 'Identity Verification', completed: false }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
            ${step.completed ? 'bg-green-600' : currentStep === step.number ? 'bg-green-600' : 'bg-gray-300'}
          `}>
            {step.completed ? <Check size={20} /> : step.number}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-20 h-1 mx-2 ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;