import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function PlaylistSessions({ filters, sessions, setSessions, loading, setLoading }) {
  const [playlist, setPlaylist] = useState(null);

  const { id } = useParams();

  const getSessions = async () => {
    setLoading(true);
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      const res = await API(
        'get',
        `/sessions/getByPlaylist/${id}?levels=${levels}&durations=${durations}`,
      );
      const playlistSessions = res?.data?.playlist;
      setPlaylist(playlistSessions);
      setSessions(playlistSessions?.sessions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <SessionsContent
      filters={filters}
      getSessions={getSessions}
      setSessions={setSessions}
      title={playlist?.title}
      mutator={id}
      loading={loading}
      sessions={sessions}
    />
  );
}

export default PlaylistSessions;
