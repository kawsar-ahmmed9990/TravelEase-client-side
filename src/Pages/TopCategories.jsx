import React from "react";

const categories = [
  { name: "SUVs", icon: "🚙" },
  { name: "Electric", icon: "⚡" },
  { name: "Vans", icon: "🚐" },
  { name: "Sedans", icon: "🚗" },
];

const TopCategories = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-700 hover:shadow-lg transition cursor-pointer"
            >
              <span className="text-4xl mb-2">{category.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
