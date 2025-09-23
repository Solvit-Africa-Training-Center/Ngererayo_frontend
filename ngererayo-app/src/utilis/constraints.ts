import { Product, Testimonial, Category } from '../types/index';

import { Users, TrendingUp, Smile, Headphones } from 'lucide-react';
export const APP_NAME = 'NGERERAYO';



export const CATEGORIES: Category[] = [
  { id: 1, name: 'Vegetables', icon: '🥦', productCount: 324 },
  { id: 2, name: 'Fruits', icon: '🍎', productCount: 215 },
  { id: 3, name: 'Cereals', icon: '🌾', productCount: 178 },
  { id: 4, name: 'Legumes', icon: '🥜', productCount: 142 },
  { id: 5, name: 'Dairy', icon: '🥛', productCount: 98 },
  { id: 6, name: 'Spices', icon: '🌶️', productCount: 87 },
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Jean Claude',
    role: 'Local Buyer',
    comment: 'The quality of products here is exceptional. I always find fresh produce from trusted farmers.',
    rating: 5,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Marie Aimee',
    role: 'Restaurant Owner',
    comment: 'This platform has made sourcing local ingredients so much easier. My customers love the fresh taste!',
    rating: 5,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Thomas',
    role: 'Farmer',
    comment: 'Ngererayo has helped me reach more customers and get fair prices for my produce. A game changer!',
    rating: 5,
    avatar: '/api/placeholder/40/40'
  }
];

