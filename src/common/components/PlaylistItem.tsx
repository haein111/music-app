import {
  Avatar,
  Button,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const PlaylistItemContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "6px",
  borderRadius: "6px",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.action.hover,
  },
  "&:active": {
    backgroundColor: theme.palette.action.active,
  },
}));

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
    <PlaylistItemContainer>
      <Button onClick={() => handleClick(id)}>
        {image ? <Avatar src={image} alt={name} /> : <Avatar>{name[0]}</Avatar>}
        <ListItemText
          primary={<Typography>{name}</Typography>}
          secondary={<Typography>{artistName}</Typography>}
        />
      </Button>
    </PlaylistItemContainer>
  );
};

export default PlaylistItem;
