import React from "react";
import theme from "../../theme";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";

function Library() {
  const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  console.log("ddd", data);
  return <EmptyPlaylist />;
}

export default Library;
