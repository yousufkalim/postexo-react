import React from 'react';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function WatchLaterSessions({ filters, sessions, setSessions }) {
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
        const currentUser = res?.data?.user;
        setSessions(currentUser?.watch_later);
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
      sessions={sessions}
    />
  );
}

export default WatchLaterSessions;
