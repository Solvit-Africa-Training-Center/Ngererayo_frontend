import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white text-center p-6 rounded-xl shadow-sm">
      <div className="text-center mb-4">
         <img 
          src={'/bg.jpg'} 
          alt={testimonial.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className='flex'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
          />
        ))}
        </div>
       
      </div>
      <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
      <div className="flex items-center">
       
        <div>
          <p className="font-medium text-gray-800">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;