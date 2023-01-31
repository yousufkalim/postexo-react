import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function SessionsByMatter({ filters, setFilters, sessions, setSessions, loading, setLoading }) {
  const { matterName } = useParams();

  useEffect(() => {
    setFilters({ levels: [], durations: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSessions = async () => {
    setLoading(true);
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      const res = await API(
        'get',
        `/sessions/getByMatter?matterName=${matterName}&levels=${levels}&durations=${durations}`,
      );
      setSessions(res?.data?.sessions);
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
      title={matterName}
      sessions={sessions}
      loading={loading}
    />
  );
}

export default SessionsByMatter;
