'use client';

import { useState, useEffect, useRef } from 'react';

type MenuItem = {
  name: string;
  description: string;
  price: string;
};

type MenuCategories = {
  starters: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
  drinks: MenuItem[];
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<'starters' | 'mains' | 'desserts' | 'drinks'>('starters');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const categories = [
    { id: 'starters' as const, name: 'Starters' },
    { id: 'mains' as const, name: 'Main Courses' },
    { id: 'desserts' as const, name: 'Desserts' },
    { id: 'drinks' as const, name: 'Drinks' },
  ];
  
  const menuItems: MenuCategories = {
    starters: [
      { name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with olive oil, salt, and tomato.', price: '$8.95' },
      { name: 'Calamari', description: 'Lightly fried squid with a tangy lemon aioli dip.', price: '$12.95' },
      { name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.', price: '$10.95' },
    ],
    mains: [
      { name: 'Filet Mignon', description: '8oz center-cut beef tenderloin with red wine reduction and roasted vegetables.', price: '$34.95' },
      { name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables.', price: '$26.95' },
      { name: 'Mushroom Risotto', description: 'Creamy Arborio rice with wild mushrooms, white wine, and Parmesan.', price: '$22.95' },
    ],
    desserts: [
      { name: 'Tiramisu', description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.', price: '$9.95' },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.', price: '$10.95' },
      { name: 'Crème Brûlée', description: 'Rich custard topped with a layer of caramelized sugar.', price: '$8.95' },
    ],
    drinks: [
      { name: 'Signature Cocktail', description: 'House special with gin, elderflower liqueur, and fresh cucumber.', price: '$12.95' },
      { name: 'Red Wine', description: 'Selection of premium red wines from our cellar.', price: '$9.95 - $18.95' },
      { name: 'Craft Beer', description: 'Rotating selection of local and imported craft beers.', price: '$7.95' },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="menu" 
      className="section bg-white"
      ref={sectionRef}
    >
      <div className="container">
        <div 
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Menu</h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto px-2">
            Explore our carefully crafted menu featuring the finest ingredients and flavors
          </p>
        </div>
        
        {/* Category Tabs - Horizontal Scrollable on Mobile */}
        <div 
          className={`transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex overflow-x-auto pb-2 mb-8 sm:mb-12 hide-scrollbar">
            <div className="flex space-x-2 mx-auto">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  className={`px-4 sm:px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm sm:text-base ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-md transform scale-105'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ 
                    transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {menuItems[activeCategory].map((item: MenuItem, index: number) => (
            <div 
              key={index} 
              className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 hover:border-primary bg-white"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-primary">{item.name}</h3>
                <span className="text-primary font-bold bg-primary bg-opacity-10 px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base">
                  {item.price}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div 
          className={`text-center mt-8 sm:mt-12 transition-all duration-1000 delay-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button className="btn btn-secondary transform hover:scale-105 transition-all duration-300">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
} 