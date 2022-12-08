import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CategoriesLeft from './CategoriesLeft';
import CategoriesRight from './CategoriesRight';

function Categories({ showMenu, openNavMenu }) {
  return (
    <div>
      <div className="Categories">
        <div className="Categories_center">
          <div className={showMenu ? 'Categories_column' : 'Categories_columnActive'}>
            <CloseIcon className="closeIcon" onClick={openNavMenu} />
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
