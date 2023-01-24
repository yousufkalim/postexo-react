import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function WatchLaterSessions({ filters }) {
  const [user, setUser] = useState(null);

  const userData = JSON.parse(localStorage.getItem('userData'));

  const getSessions = async () => {
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API(
        'get',
        `/sessions/getWatchLaterSessions/${userData?._id}?levels=${levels}&durations=${durations}`,
      ).then((res) => {
        console.log('watch later sessions ', res.data);
        setUser(res?.data?.user);
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      getSessions={getSessions}
      title="See Later"
      sessions={user?.watch_later}
    />
  );
}

export default WatchLaterSessions;
