import { Box, Typography } from "@mui/material";
import { ApiResponse } from "../../models/apiResponse";
import AlbumCard from "./AlbumCard";
import { SimplifiedAlbum } from "../../models/album";

interface AlbumBoxProps {
  albums: ApiResponse<SimplifiedAlbum>;
}

const AlbumsBox = ({ albums }: AlbumBoxProps) => {
  return (
    <Box>
      <Typography variant="h1">Albums</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {albums?.items.slice(0, 8).map((album) => {
          return <AlbumCard key={album.id} albums={album} />;
        })}
      </Box>
    </Box>
  );
};

export default AlbumsBox;
