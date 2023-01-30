import React, { useState, cloneElement } from 'react';
// eslint-disable-next-line import/no-named-as-default
import { createFilter } from 'react-search-input';
import CloseIcon from '@mui/icons-material/Close';
import CategoriesLeft from '../components/HomeGrid/CategoriesLeft';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Salespro from '../components/HomeGrid/Salespro';
import Banner from '../common/Banner';

const KEYS_TO_FILTERS = ['subject', 'professor_name', 'student_level', 'matter', 'student_name'];

function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(true);
  const [filters, setFilters] = useState({ levels: [], durations: [] });
  const [sessions, setSessions] = useState([]);
  const [searchText, setSearchText] = useState('');

  const openNavMenu = () => {
    setShowMenu(!showMenu);
  };

  // const memoFilters = useMemo(() => {
  //   return filters;
  // }, [filters]);

  const filteredSessions = sessions.filter(createFilter(searchText, KEYS_TO_FILTERS));

  return (
    <div>
      <Navbar2 setSearchText={setSearchText} openNavMenu={openNavMenu} />
      <div>
        <div className="Categories">
          <div className="Categories_center">
            <div className={showMenu ? 'Categories_column' : 'Categories_columnActive'}>
              <CloseIcon className="closeIcon" onClick={openNavMenu} />
              <CategoriesLeft setFilters={setFilters} filters={filters} />
            </div>
            <div className="Categories_column2">
              <Salespro />

              {cloneElement(children, {
                filters,
                setFilters,
                sessions: filteredSessions,
                setSessions,
              })}

              <Banner />
            </div>
          </div>
        </div>
      </div>
      {/* <Categories showMenu={showMenu} openNavMenu={openNavMenu} /> */}
    </div>
  );
}

export default Layout;
