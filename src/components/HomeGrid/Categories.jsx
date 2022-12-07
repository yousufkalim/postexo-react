import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CategoriesLeft from './CategoriesLeft';
import CategoriesRight from './CategoriesRight';

function Categories() {
  const [showMenu, setShowMenu] = useState(true);

  const openNavMenu = () => {
    setShowMenu(false);
  };
  return (
    <div>
      <div className="Categories">
        <div className="Categories_center">
          <div className="Categories_column">
            <MenuIcon className="hambgr" onClick={openNavMenu} />
            <CategoriesLeft showMenu={showMenu} />
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
