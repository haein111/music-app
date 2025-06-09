import React from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";

function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  const { data: playlist } = useGetPlaylist({ playlist_id: id });
  console.log("dsa", playlist);
  return <div>PlaylistDetailPage</div>;
}

export default PlaylistDetailPage;
