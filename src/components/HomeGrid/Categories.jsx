import React from 'react';
import CategoriesLeft from './CategoriesLeft';
import CategoriesRight from './CategoriesRight';

function Categories() {
  return (
    <div>
      <div className="Categories">
        <div className="Categories_center">
          <div className="Categories_column">
            <CategoriesLeft />
          </div>
          <div className="Categories_column2">
            <CategoriesRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
