import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function WatchLaterSessions({ filters, sessions, setSessions, loading, setLoading }) {
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const getSessions = async () => {
    setLoading(true);
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      const res = await API(
        'get',
        `/sessions/getWatchLaterSessions/${userData?._id}?levels=${levels}&durations=${durations}`,
      );
      const currentUser = res?.data?.user;
      setSessions(currentUser?.watch_later);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      getSessions={getSessions}
      setSessions={setSessions}
      title={t('See later')}
      sessions={sessions}
      loading={loading}
    />
  );
}

export default WatchLaterSessions;
