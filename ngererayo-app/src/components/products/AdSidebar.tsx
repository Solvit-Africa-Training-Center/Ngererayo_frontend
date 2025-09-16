import React from 'react';
import { ExternalLink, Truck, Shield, Headphones, Zap } from 'lucide-react';

const AdSidebar: React.FC = () => {
  const ads = [
    {
      id: 1,
      title: "Premium Farming Tools",
      description: "Get 20% off on all farming equipment this month!",
      image: "/categoryImages/Services.jpeg",
      buttonText: "Shop Now",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      id: 2,
      title: "Fresh Organic Seeds",
      description: "Start your organic garden with our certified seeds",
      image: "/categoryImages/seeds.jpeg",
      buttonText: "Browse Seeds",
      color: "bg-gradient-to-br from-yellow-500 to-orange-500"
    }
  ];

  const features = [
    {
      icon: <Truck size={20} />,
      title: "Free Delivery",
      description: "On orders above RWF 10,000"
    },
    {
      icon: <Shield size={20} />,
      title: "Quality Guarantee",
      description: "100% fresh products"
    },
    {
      icon: <Headphones size={20} />,
      title: "24/7 Support",
      description: "Always here to help"
    },
    {
      icon: <Zap size={20} />,
      title: "Fast Processing",
      description: "Quick order processing"
    }
  ];

  const tips = [
    "Store vegetables in cool, dry places to maintain freshness",
    "Buy seasonal produce for better prices and quality",
    "Support local farmers by choosing nearby sellers",
    "Check product reviews before making purchases"
  ];

  return (
    <div className="space-y-6">
      {/* Featured Ads */}
      {ads.map((ad) => (
        <div key={ad.id} className={`${ad.color} rounded-lg p-6 text-white relative overflow-hidden`}>
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
            <p className="text-sm mb-4 opacity-90">{ad.description}</p>
            <button className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
              {ad.buttonText}
              <ExternalLink size={14} />
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <div className="w-24 h-24 bg-white rounded-full"></div>
          </div>
        </div>
      ))}

      {/* Features */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Ngererayo?</h3>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="text-green-600 mt-1">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping Tips</h3>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-4">Get notified about new products and special offers</p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-900 text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-300 mb-4">Our support team is ready to assist you</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Headphones size={16} />
            <span>+250 788 123 456</span>
          </div>
          <div className="text-sm text-gray-300">
            Available 24/7
          </div>
        </div>
        <button className="mt-4 w-full bg-white text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default AdSidebar;