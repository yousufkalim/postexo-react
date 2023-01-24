import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function ProfessorVideos({ filters }) {
  const [sessions, setSessions] = useState([]);

  const { name } = useParams();

  const getSessions = async () => {
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API(
        'get',
        `/sessions/getByProfessor?professorName=${name}&levels=${levels}&durations=${durations}`,
      ).then((res) => {
        setSessions(res?.data?.sessions);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SessionsContent filters={filters} getSessions={getSessions} title={name} sessions={sessions} />
  );
}

export default ProfessorVideos;
