import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function ProfessorVideos({ filters, sessions, setSessions, loading, setLoading }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const { name } = useParams();

  const getSessions = async (isFiltersChanged) => {
    setLoading(true);
    try {
      const currentPage = isFiltersChanged ? 1 : page;
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API(
        'get',
        `/sessions/getByProfessor?professorName=${name}&pageSize=20&page=${currentPage}&&levels=${levels}&durations=${durations}`,
      ).then((res) => {
        setSessions((prev) => {
          if (prev?.length > 0 && !isFiltersChanged) {
            return [...prev, ...res.data.sessions];
          }
          return res.data.sessions;
        });
        setHasMore(res?.data?.hasMore);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      setSessions={setSessions}
      getSessions={getSessions}
      title={name}
      sessions={sessions}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
      loading={loading}
    />
  );
}

export default ProfessorVideos;
