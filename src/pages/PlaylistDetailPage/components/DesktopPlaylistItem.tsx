import React from "react";
import { PlaylistTrack } from "../../../models/playlist";
import { Table, TableCell, TableRow } from "@mui/material";
import { Episode, Track } from "../../../models/track";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };
  const msToMinutesAndSeconds = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "unknown";

    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "unknown"}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </TableCell>
      <TableCell>{formatDate(item.added_at)}</TableCell>
      <TableCell>
        {item.track.duration_ms
          ? msToMinutesAndSeconds(item.track.duration_ms)
          : "unknown"}
      </TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;
