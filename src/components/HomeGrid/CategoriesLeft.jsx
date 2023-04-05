/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import API from '../../api';

const durations = ['Very short', 'Short', 'Long'];
// const languages = ['English', 'Urdu', 'French'];

function CategoriesLeft({ filters, setFilters }) {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});
  const [allLevels, setAllLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const params = useParams();
  const history = useLocation();

  const userData = JSON.parse(localStorage.getItem('userData'));

  const navigate = useNavigate();

  // eslint-disable-next-line prefer-regex-literals
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

  const isSessionUrl = history.pathname.includes('sessions') && checkForHexRegExp.test(params?.id);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getLevels = async () => {
    try {
      const response = await API('get', '/levels');
      setAllLevels(response?.data?.levels);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (name, value) => {
    const isExist = filters[name]?.find((item) => item === value);
    // const alreadyExist = filters?.forEach((item) => {
    //   item?.find((val) => val === value);
    // });
    if (isExist) {
      const values = filters[name]?.filter((item) => item !== value);
      setFilters({ ...filters, [name]: values });
    } else {
      setFilters({ ...filters, [name]: [...filters[name], value] });
    }
  };

  const handlePlaylist = (id) => {
    navigate(`/playlist/${id}`);
  };

  const handleFavourites = () => {
    navigate('/sessions/favourites');
  };

  const resetFilters = () => {
    setFilters({ levels: [], durations: [] });
  };

  const getUserInfo = async () => {
    await API('get', `/users/${userData?._id}`)
      .then((res) => {
        setUserInfo(res?.data?.user);
      })
      .catch((err) => console.log('USER INFORMATION ====> ERROR ==> ', err));
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePlaylist = () => {
    API('post', '/playlist', { title: playlistName, userId: userData?._id })
      .then(() => {
        getUserInfo();
        setPlaylistName('');
        setIsModalOpen(false);
      })
      .catch((err) => toast.error(err?.message));
  };

  useEffect(() => {
    resetFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    getLevels();
  }, []);

  const isDisabledBtn = !filters?.levels?.length && !filters?.durations?.length;

  return (
    <div>
      <Modal
        footer={false}
        className="create_playlist_modal"
        title={t('Create new playlist')}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <div className="create_playlist_modal_title">{t('New Playlist Name')}</div>
        <input
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="inp"
          placeholder={t('Enter Playlist Name')}
          type="text"
        />
        <div className="create-div">
          <button
            disabled={!playlistName}
            type="button"
            onClick={() => handleCreatePlaylist()}
            className={!playlistName ? 'create disabled' : 'create'}
          >
            {t('Create')}
          </button>
        </div>
      </Modal>
      <div className="CategoriesLeft">
        <p className="CategoriesLeft_title">{t('Categories')}</p>
        <div className="border_line" />
        <div className="Categories_favourit_fields" role="presentation" onClick={handleFavourites}>
          <p className="MyFav_list">{t('My Favourites')}</p>
          <p className="favourites_counts">{userInfo?.favorites?.length}</p>
        </div>
        <div
          role="presentation"
          onClick={() => navigate('/sessions/watch-later')}
          className="Categories_favourit_fields"
        >
          <p className="MyFav_list">{t('See Later')}</p>
          <p className="favourites_counts">{userInfo?.watch_later?.length}</p>
        </div>
        {userInfo?.play_list?.length > 0 &&
          userInfo?.play_list?.map((playlist) => (
            <div key={playlist._id} className="Categories_favourit_fields categories_playlist">
              <p
                className="MyFav_list"
                onClick={() => handlePlaylist(playlist?._id)}
                role="presentation"
              >
                {playlist?.title}
              </p>
              <p className="favourites_counts">{playlist?.sessions?.length}</p>
            </div>
          ))}
        <p onClick={showModal} role="presentation" className="create_playlist">
          {t('Create playlist')}
        </p>
        {!isSessionUrl && (
          <>
            <div className="filter_div">
              <p className="filter_title">{t('Filters')}</p>
              <button
                disabled={isDisabledBtn}
                onClick={() => resetFilters()}
                type="button"
                className="clear_btn"
              >
                {t('Clear')}
              </button>
            </div>
            <div className="border_line" />

            <div className="Classess_div">
              <p className="classes_p">{t('Classes')}</p>
              {allLevels?.map((level) => (
                <div key={level?._id} className="checked_option">
                  <Checkbox
                    checked={filters?.levels?.find((item) => item === level?.label) ?? false}
                    onChange={() => handleChange('levels', level?.label)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    style={{ color: 'white', padding: '0' }}
                  />
                  <label htmlFor="Level" className="levelLabel text-ellipsis-1">
                    {level?.label}
                  </label>
                </div>
              ))}
              <p className="duraiton_p">{t('video duration')}</p>
              {durations?.map((duration) => (
                <div key={duration} id={duration} className="checked_option">
                  <Checkbox
                    checked={filters?.durations?.find((item) => item === duration) ?? false}
                    onChange={() => handleChange('durations', duration)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    style={{ color: 'white', padding: '0' }}
                  />
                  <label htmlFor="Level" className="levelLabel">
                    {t(duration)}
                  </label>
                </div>
              ))}
              {/* <p className="language_P">Language</p> */}
              {/* {languages?.map((lang) => (
              <div className="checked_option">
                <Checkbox
                  checked={filters?.languages?.find((item) => item === lang) ?? false}
                  onChange={() => handleChange('languages', lang)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  style={{ color: 'white', padding: '0' }}
                />
                <label htmlFor="Level" className="levelLabel">
                  {lang}
                </label>
              </div>
            ))} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CategoriesLeft;
