import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function PlaylistSessions({ filters }) {
  const [playlist, setPlaylist] = useState(null);

  const { id } = useParams();

  const getSessions = async () => {
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API(
        'get',
        `/sessions/getByPlaylist/${id}?levels=${levels}&durations=${durations}`,
      ).then((res) => {
        const playlistSessions = res?.data?.playlist;
        setPlaylist(playlistSessions);
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      getSessions={getSessions}
      title={playlist?.title}
      mutator={id}
      sessions={playlist?.sessions}
    />
  );
}

export default PlaylistSessions;
