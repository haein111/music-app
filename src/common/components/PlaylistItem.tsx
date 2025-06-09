import { Avatar, Button, ListItemText, Typography } from "@mui/material";
import React from "react";

interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  handleClick: (id: string) => void;
}

const PlaylistItem = ({
  image,
  name,
  artistName,
  id,
  handleClick,
}: PlaylistItemProps) => {
  return (
    <Button onClick={() => handleClick(id)}>
      {image ? <Avatar src={image} alt={name} /> : <Avatar>{name[0]}</Avatar>}
      <ListItemText
        primary={<Typography>{name}</Typography>}
        secondary={<Typography>{artistName}</Typography>}
      />
    </Button>
  );
};

export default PlaylistItem;
