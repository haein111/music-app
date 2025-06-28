import { Box, Typography } from "@mui/material";
import ErrorMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";

const TracksSection = () => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: "genre: k-pop, year:2025",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
    limit: 6,
    market: "ES",
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" fontWeight={700} padding="8px">
        최신 음악
      </Typography>
    </div>
  );
};

export default TracksSection;
