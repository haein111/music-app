import React from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import {
  Box,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "../../theme";
import DefaultImage from "../../common/components/DefaultImage";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import DestktoPlaylistItem from "./components/DestktoPlaylistItem";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  padding: "10px",
});

const ImgaeGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "6px",
  width: "100%",
  height: "100px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100px",
  },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: palylistError,
  } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: 10, offset: 0 });

  console.log("dsa", playlistItems);

  if (isPlaylistLoading) return <LoadingSpinner />;
  if (palylistError)
    return <ErrorMessage errorMessage={palylistError.message} />;

  return (
    <>
      <PlaylistHeader container spacing={7}>
        <ImgaeGrid>
          {playlist?.images ? (
            <AlbumImage
              src={playlist.images[0].url}
              width="60"
              alt={playlist.name || "Playlist cover"}
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon />
            </DefaultImage>
          )}
        </ImgaeGrid>
        <Box>
          <Typography variant="h1" ml={1} fontWeight={700} marginBottom="6px">
            {playlist?.name}
          </Typography>
          <Box display="flex" alignItems="center" ml={1}>
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              width="20px"
              alt="spotify-img"
            />
            <Typography variant="body1" ml={1}>
              {playlist?.owner.display_name}
            </Typography>
            <Typography variant="body1" ml={1}>
              • {playlist?.tracks?.total} songs
            </Typography>
          </Box>
        </Box>
      </PlaylistHeader>
      {playlist?.tracks?.total ? (
        <Typography>
          자꾸 오류가 떠서... 출근해야 하므로... 오늘 일 끝나고 마무리 예정...
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlistItems?.pages.map((page) =>
              page.items.map((item) => {
                return <DestktoPlaylistItem />;
              })
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default PlaylistDetailPage;
