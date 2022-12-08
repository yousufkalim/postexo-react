import React, { useState } from 'react';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Categories from '../components/HomeGrid/Categories';

function HomeGrid() {
  const [showMenu, setShowMenu] = useState(true);

  const openNavMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div>
      <Navbar2 openNavMenu={openNavMenu} />
      <Categories showMenu={showMenu} openNavMenu={openNavMenu} />
    </div>
  );
}

export default HomeGrid;
