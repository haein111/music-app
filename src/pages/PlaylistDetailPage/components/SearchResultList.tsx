import React from "react";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  Tab,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const AlbumContainer = styled(TableRow)(({ theme }) => ({
  width: "100%",
  margin: "0 10px",
}));

interface SearchResultListProps {
  list: Track[];
}

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "6px",
  width: "50px",
  marginRight: "8px",
}));

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      {list.map((track) => (
        <AlbumContainer key={track.id}>
          <TableCell>
            <Box display={"flex"} alignItems="center">
              <Box>
                <AlbumImage
                  src={
                    track.album &&
                    track.album.images &&
                    track.album.images.length > 0
                      ? track.album.images[0].url
                      : "default-image-url.jpg"
                  }
                  alt="Album cover"
                />
              </Box>
              <Box>
                <Typography variant="h2" fontWeight={700}>
                  {track.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {track.artists && track.artists.length > 0
                    ? track.artists[0]?.name
                    : "Unknown"}
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Typography variant="h2">{track.album?.name}</Typography>
          </TableCell>
          <TableCell>
            <Button>Add</Button>
          </TableCell>
        </AlbumContainer>
      ))}

      {/* 무한 스크롤 */}
      <div ref={ref} style={{ height: 1 }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default SearchResultList;
