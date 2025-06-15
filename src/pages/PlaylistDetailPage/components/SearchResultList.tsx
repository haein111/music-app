import React, { useState } from "react";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useAddItemsToPlaylist from "../../../hooks/useAddItemsToPlaylist";
import { useParams } from "react-router";

const AlbumContainer = styled(TableRow)(({ theme }) => ({
  width: "100%",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "6px",
  width: "50px",
  marginRight: "8px",
}));

interface SearchResultListProps {
  list: Track[];
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();
  // useParams를 사용하여 URL에서 id를 가져옵니다.
  const { id } = useParams<{ id: string }>();
  const [uris, setUris] = useState<string[]>([]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const toggleUri = (uri: string) => {
    setUris((prev) =>
      prev.includes(uri) ? prev.filter((u) => u !== uri) : [...prev, uri]
    );
  };

  const { mutate: addItemToPlaylist } = useAddItemsToPlaylist(id as string);

  const handleAddPlaylist = (uri: string) => {
    const newUris = uris.includes(uri) ? uris : [...uris, uri];

    addItemToPlaylist({
      uris: newUris,
      position: 0,
    });
  };

  return (
    <div>
      {list.map((track, index) => {
        const uri = track.uri;
        if (!uri) return null; // if uri is undefined, skip rendering
        const isSelected = uris.includes(uri);
        return (
          <Table
            key={uri ?? index}
            onClick={() => toggleUri(uri)}
            sx={{
              tableLayout: "fixed",
              width: "100%",
              backgroundColor: isSelected ? "#1db95433" : "transparent",
            }}
          >
            <TableBody>
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
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPlaylist(uri);
                    }}
                  >
                    Add
                  </Button>
                </TableCell>
              </AlbumContainer>
            </TableBody>
          </Table>
        );
      })}

      {/* 무한 스크롤 */}
      <div ref={ref} style={{ height: 1 }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default SearchResultList;
