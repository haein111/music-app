import React, { useEffect } from "react";
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
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import LoginButton from "../../common/components/LoginButton";
import { isAxiosError } from "axios";
import ErrorHandler from "./ErrorHandler";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  padding: "10px",
});

const ImageGrid = styled(Grid)(({ theme }) => ({
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

const RootContainer = styled("div")({
  height: "600px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const PlaylistContent = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

const EmptyStateContainer = styled(Box)({
  height: "calc(100% - 64px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ref, inView } = useInView();
  if (id === undefined) return <Navigate to="/" />;

  // const {
  //   data: playlist,
  //   isLoading: isPlaylistLoading,
  //   error: palylistError,
  // } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlist,
    error,
    isLoading: isPlaylistLoading,
  } = useGetPlaylist({ playlist_id: id });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: 10 });

  if (isPlaylistLoading) return <LoadingSpinner />;

  //로그인 요청청
  if (error || playlistItemsError) {
    if (error?.status === 401 || playlistItemsError?.status === 401) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100%"
        >
          <Typography variant="h2" fontWeight="bold" mb={2}>
            로그인이 필요합니다
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <Typography>오류가 발생했습니다.</Typography>;
  }

  return (
    <>
      <RootContainer>
        <PlaylistHeader container spacing={7}>
          <ImageGrid>
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
          </ImageGrid>
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
        {playlist?.tracks?.total === 0 ? (
          <EmptyPlaylistWithSearch />
        ) : (
          <PlaylistContent>
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
                {playlistItems?.pages.map((page, pageIndex) =>
                  page.items.map((item, itemIndex) => {
                    return (
                      <DesktopPlaylistItem
                        item={item}
                        key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                        index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      />
                    );
                  })
                )}
                <TableRow sx={{ height: "5px" }} ref={ref} />
                {isFetchingNextPage && <LoadingSpinner />}
              </TableBody>
            </Table>
          </PlaylistContent>
        )}
      </RootContainer>
    </>
  );
};
export default PlaylistDetailPage;
