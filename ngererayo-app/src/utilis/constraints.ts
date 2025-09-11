import { Product, Testimonial, Category, Farmer, StatItem } from '../';

import { Users, TrendingUp, Smile, Headphones } from 'lucide-react';
export const APP_NAME = 'NGERERAYO';
import { IconType } from 'react-icons';

export const STATS_DATA = [
  {
    value: '1,247',
    label: 'Active Farmers',
    icon: Users
  },
  {
    value: '5,893',
    label: 'Products listed',
    icon: TrendingUp
  },
  {
    value: '97%',
    label: 'Satisfaction rate',
    icon: Smile
  },
  {
    value: '24/7',
    label: 'Support available',
    icon: Headphones
  }
];
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

export const FARMERS: Farmer[] = [
  {
    id: 1,
    name: 'Green Fields Farm',
    location: 'Kigali',
    rating: 4.8,
    products: ['Vegetables', 'Fruits'],
    image: '/api/placeholder/100/100'
  },
  {
    id: 2,
    name: 'Sunshine Organics',
    location: 'Musanze',
    rating: 4.9,
    products: ['Fruits', 'Herbs'],
    image: '/api/placeholder/100/100'
  },
  {
    id: 3,
    name: 'Roots & Shoots',
    location: 'Huye',
    rating: 4.5,
    products: ['Vegetables', 'Root Crops'],
    image: '/api/placeholder/100/100'
  },
  {
    id: 4,
    name: 'Golden Harvest',
    location: 'Rubavu',
    rating: 4.7,
    products: ['Cereals', 'Grains'],
    image: '/api/placeholder/100/100'
  }
];