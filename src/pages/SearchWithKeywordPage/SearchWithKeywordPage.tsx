import { Box, Typography } from "@mui/material";
import { SEARCH_TYPE } from "../../models/search";
import { useParams } from "react-router";
import useGetSearchResult from "../../hooks/useGetSearchResult";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import TopSearchResults from "./TopSearchResults";

function SearchWithKeywordPage() {
  const { keyword } = useParams<{ keyword: string }>();

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: isPlaylistError,
  } = useGetSearchResult({
    q: keyword as string,
    type: [SEARCH_TYPE.Album, SEARCH_TYPE.Artist, SEARCH_TYPE.Track],
  });

  if (isPlaylistLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (isPlaylistError) return <div>Error fetching data</div>;

  const typesToCheck = ["albums", "artists", "tracks"];

  const isEmptyResult =
    playlist && typesToCheck.every((key) => (playlist as any)[key].total === 0);
  console.log("playlist:", playlist);
  return (
    <Box>
      {isEmptyResult ? (
        <Typography variant="subtitle1" fontWeight="bold">
          No Results
        </Typography>
      ) : (
        <>
          <TopSearchResults tracks={playlist?.tracks} />
          {/* <ArtistResults /> */}
          {/* <AlbumResults /> */}
        </>
      )}
    </Box>
  );
}

export default SearchWithKeywordPage;
