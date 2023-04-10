import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function FavouriteSessions({ filters, sessions, setSessions, loading, setLoading }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    setSessions([]);
  }, [setSessions]);

  const getSessions = async () => {
    setLoading(true);
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      const res = await API(
        'get',
        `/sessions/getFavouriteSessions/${userData?._id}?pageSize=5&page=${page}&levels=${levels}&durations=${durations}`,
      );
      setSessions((prev) => {
        if (prev?.length > 0) {
          return [...prev, ...res.data.user.favorites];
        }
        return res?.data?.user?.favorites;
      });
      setHasMore(res?.data?.hasMore);
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
      title={t('My Favourites')}
      sessions={sessions}
      loading={loading}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
    />
  );
}

export default FavouriteSessions;
