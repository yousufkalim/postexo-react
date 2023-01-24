import React, { useState, cloneElement } from 'react';
// eslint-disable-next-line import/no-named-as-default
import CloseIcon from '@mui/icons-material/Close';
import CategoriesLeft from '../components/HomeGrid/CategoriesLeft';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Salespro from '../components/HomeGrid/Salespro';

function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(true);
  const [filters, setFilters] = useState({ levels: [], durations: [], languages: [] });

  const openNavMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div>
      <Navbar2 openNavMenu={openNavMenu} />
      <div>
        <div className="Categories">
          <div className="Categories_center">
            <div className={showMenu ? 'Categories_column' : 'Categories_columnActive'}>
              <CloseIcon className="closeIcon" onClick={openNavMenu} />
              <CategoriesLeft setFilters={setFilters} filters={filters} />
            </div>
            <div className="Categories_column2">
              <Salespro />

              {cloneElement(children, { filters, setFilters })}
            </div>
          </div>
        </div>
      </div>
      {/* <Categories showMenu={showMenu} openNavMenu={openNavMenu} /> */}
    </div>
  );
}

export default Layout;
