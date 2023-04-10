import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';
import SessionsContent from '../components/SessionsContent/SessionsContent';

function PlaylistSessions({ filters, sessions, setSessions, loading, setLoading }) {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const { id } = useParams();

  const getSessions = async (isFiltersChanged) => {
    setLoading(true);
    try {
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      const res = await API(
        'get',
        `/sessions/getByPlaylist/${id}?pageSize=20&page=${page}&levels=${levels}&durations=${durations}`,
      );
      const playlistSessions = res?.data?.playlist;
      setPlaylistTitle(playlistSessions?.title);
      setSessions((prev) => {
        if (prev?.length > 0 && !isFiltersChanged) {
          return [...prev, ...playlistSessions.sessions];
        }
        return playlistSessions?.sessions;
      });
      setHasMore(res?.data?.hasMore);
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
      title={playlistTitle}
      mutator={id}
      loading={loading}
      sessions={sessions}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
    />
  );
}

export default PlaylistSessions;
