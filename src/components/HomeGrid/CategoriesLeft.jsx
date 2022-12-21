/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import API from '../../api';

const durations = ['Very short', 'Short', 'Long'];
const languages = ['English', 'Urdu', 'French'];

function CategoriesLeft() {
  const [allLevels, setAllLevels] = useState([]);
  // const [filters, setFilters] = useState({ levels: [], duration: [], language: [] });

  const getLevels = () => {
    API('get', '/levels')
      .then((res) => {
        console.log('LEVLS ', res);
        setAllLevels(res?.data?.levels);
      })
      .catch(() => {});
  };

  // const handleChange = (name, value) => {};

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <div>
      <div className="CategoriesLeft">
        <p className="CategoriesLeft_title">Categories</p>
        <div className="border_line" />
        <div className="Categories_favourit_fields">
          <p className="MyFav_list">My favourites</p>
          <p className="favourites_counts">1</p>
        </div>
        <div className="Categories_favourit_fields">
          <p className="MyFav_list">See later</p>
          <p className="favourites_counts">1</p>
        </div>
        <p className="create_playlist">Create my playlist</p>
        <div className="filter_div">
          <p className="filter_title">Filters</p>
          <button type="button" className="clear_btn">
            Clear
          </button>
        </div>
        <div className="border_line" />

        <div className="Classess_div">
          <p className="classes_p">Classes</p>
          {allLevels?.map((level) => (
            <div id={level?._id} className="checked_option">
              <Checkbox style={{ color: 'white', padding: '0' }} />
              <label htmlFor="Level" className="levelLabel">
                {level?.label}
              </label>
            </div>
          ))}
          <p className="duraiton_p">video duration</p>
          {durations?.map((duration) => (
            <div id={duration} className="checked_option">
              <Checkbox style={{ color: 'white', padding: '0' }} />
              <label htmlFor="Level" className="levelLabel">
                {duration}
              </label>
            </div>
          ))}
          <p className="language_P">Language</p>
          {languages?.map((lang) => (
            <div className="checked_option">
              <Checkbox style={{ color: 'white', padding: '0' }} />
              <label htmlFor="Level" className="levelLabel">
                {lang}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesLeft;
