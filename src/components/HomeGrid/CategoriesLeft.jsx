/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Checkbox from '@mui/material/Checkbox';

function CategoriesLeft() {
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
          <div className="checked_option">
            <Checkbox defaultChecked style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 1
            </label>
          </div>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 2
            </label>
          </div>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 3
            </label>
          </div>
          <p className="duraiton_p">video duration</p>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 3
            </label>
          </div>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 3
            </label>
          </div>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 3
            </label>
          </div>
          <p className="language_P">Language</p>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 3
            </label>
          </div>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 3
            </label>
          </div>
          <div className="checked_option">
            <Checkbox style={{ color: 'white', padding: '0' }} />
            <label htmlFor="Level" className="levelLabel">
              Level 3
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesLeft;
