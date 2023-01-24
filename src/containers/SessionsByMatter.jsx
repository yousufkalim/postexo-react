import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function SessionsByMatter({ filters, setFilters }) {
  const [sessions, setSessions] = useState([]);

  const { matterName } = useParams();

  useEffect(() => {
    setFilters({ levels: [], durations: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSessions = async () => {
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API(
        'get',
        `/sessions/getByMatter?matterName=${matterName}&levels=${levels}&durations=${durations}`,
      ).then((res) => {
        setSessions(res?.data?.sessions);
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      getSessions={getSessions}
      title={matterName}
      sessions={sessions}
    />
  );
}

export default SessionsByMatter;
