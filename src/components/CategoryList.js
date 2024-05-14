import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories }) => {
  return (
    <div className='grid grid-cols-2 w-full px-1 font-Quato'>
      {categories && categories.map((category) => (
        <CategoryItem name={category.category_name} key={category.category_id} />
      ))}
    </div>
  );
};

export default CategoryList;
