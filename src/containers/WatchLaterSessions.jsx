import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function WatchLaterSessions({ filters, sessions, setSessions, loading, setLoading }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const { t } = useTranslation();

  const userData = JSON.parse(localStorage.getItem('userData'));

  const getSessions = async (isFiltersChanged) => {
    setLoading(true);
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      const res = await API(
        'get',
        `/sessions/getWatchLaterSessions/${userData?._id}?pageSize=20&page=${page}&levels=${levels}&durations=${durations}`,
      );
      const currentUser = res?.data?.user;

      setSessions((prev) => {
        if (prev?.length > 0 && !isFiltersChanged) {
          return [...prev, ...currentUser.watch_later];
        }
        return currentUser?.watch_later;
      });
      setHasMore(res?.data?.hasMore);
      // setSessions(currentUser?.watch_later);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      getSessions={getSessions}
      setSessions={setSessions}
      title={t('See Later')}
      sessions={sessions}
      loading={loading}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
    />
  );
}

export default WatchLaterSessions;
