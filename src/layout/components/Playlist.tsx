import React, { useState } from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import PlaylistItem from "../../common/components/PlaylistItem";
import { useNavigate } from "react-router";
import { PlaylistArray } from "../../models/playlist";

interface PlaylistProps {
  playlists: PlaylistArray[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  //   const { data } = useGetCurrentUserPlaylists();
  //   console.log("Ddd", data);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  const handleItemClick = (id: string) => {
    setSelectedId(id);
    navigate(`/playlist/${id}`);
  };
  return (
    <div>
      {playlists.map((item) => (
        <PlaylistItem
          selected={selectedId === item.id}
          handleClick={handleItemClick}
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ""}
          key={item.id}
          artistName={"Playlist •" + item.owner?.display_name}
        />
      ))}
    </div>
  );
};

export default Playlist;
