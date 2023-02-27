import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function FavouriteSessions({ filters, sessions, setSessions, loading, setLoading }) {
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
        `/sessions/getFavouriteSessions/${userData?._id}?levels=${levels}&durations=${durations}`,
      );
      setSessions(res?.data?.user?.favorites);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      setSessions={setSessions}
      getSessions={getSessions}
      title={t('My favourites')}
      sessions={sessions}
      loading={loading}
    />
  );
}

export default FavouriteSessions;
