import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, TrendingUp, Smile, Headphones } from "lucide-react";
import StatCard from "../../components/landingpage/StatCard";

interface StatItem {
  value: string | number;
  label: string;
  icon: React.ComponentType<any>;
}

const StatsSection: React.FC = () => {
  const [activeFarmers, setActiveFarmers] = useState<number>(0);
  const [productsListed, setProductsListed] = useState<number>(0);

  useEffect(() => {
    // Fetch farmers
    axios
      .get("https://ngererayo-backend.onrender.com/market/owners/")
      .then((res) => setActiveFarmers(res.data.owners_count))
      .catch((err) => console.error("Error fetching farmers:", err));

    // Fetch products
    axios
      .get("https://ngererayo-backend.onrender.com/market/all-products/")
      .then((res) => setProductsListed(res.data.length))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const stats: StatItem[] = [
    { value: activeFarmers, label: "Active Farmers", icon: Users },
    { value: productsListed, label: "Products Listed", icon: TrendingUp },
    { value: "97%", label: "Satisfaction Rate", icon: Smile },
    { value: "24/7", label: "Support Available", icon: Headphones },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-2 border-gray-300 rounded-3xl py-5"
            >
              <StatCard stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
