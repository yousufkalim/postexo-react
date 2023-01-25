import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api';
import { mediaUrl } from '../config';

function Banner() {
  const [banner, setBanner] = useState(null);

  const getBanner = async () => {
    try {
      const res = await API('get', '/banners');
      const banners = res?.data?.banners;
      setBanner(banners?.[0]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div className="banner" style={{ backgroundImage: `${mediaUrl}/${banner?.bannerImg}` }}>
      <img src={`${mediaUrl}/${banner?.bannerImg}`} alt="banner" className="banner_image" />
      <a target="_blank" href={banner?.link} className="banner_btn" type="button" rel="noreferrer">
        Learn More
      </a>
    </div>
  );
}

export default Banner;
