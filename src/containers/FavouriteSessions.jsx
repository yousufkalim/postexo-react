import React from 'react';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function FavouriteSessions({ filters, sessions, setSessions }) {
  const userData = JSON.parse(localStorage.getItem('userData'));

  const getSessions = async () => {
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API(
        'get',
        `/sessions/getFavouriteSessions/${userData?._id}?levels=${levels}&durations=${durations}`,
      ).then((res) => {
        setSessions(res?.data?.user?.favorites);
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      setSessions={setSessions}
      getSessions={getSessions}
      title="My Favourites"
      sessions={sessions}
    />
  );
}

export default FavouriteSessions;
