import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function ProfessorVideos({ filters, sessions, setSessions }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const { name } = useParams();

  const getSessions = async () => {
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API(
        'get',
        `/sessions/getByProfessor?professorName=${name}&pageSize=2&page=${page}&&levels=${levels}&durations=${durations}`,
      ).then((res) => {
        setSessions((prev) => {
          if (prev?.length > 0) {
            return [...prev, ...res.data.sessions];
          }
          return res.data.sessions;
        });
        setHasMore(res?.data?.hasMore);
      });
    } catch (err) {
      console.log(err);
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
    />
  );
}

export default ProfessorVideos;
