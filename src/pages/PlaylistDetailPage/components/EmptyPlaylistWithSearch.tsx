import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled(Box)({
  padding: "14px",
  width: "100%",
  height: "100%",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: "20px",
  backgroundColor: theme.palette.action.active,
  borderRadius: "6px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  // 검색 결과가 없을 때 처리
  const tracks = data?.pages[0]?.tracks?.items ?? [];
  const hasResults = tracks.length > 0;

  return (
    <SearchContainer>
      <div>
        <Typography variant="h1" my="10px">
          Let's find something for your plylist
        </Typography>

        <StyledTextField
          value={keyword}
          onChange={handleKeywordChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
        {data?.pages.map((item) => {
          if (!item.tracks) return false;
          return <SearchResultList list={item.tracks.items} />;
        })}

        {isLoading ? (
          <LoadingSpinner /> // Loading state
        ) : hasResults ? (
          <SearchResultList list={tracks} />
        ) : keyword === "" ? (
          <></> // When keyword is empty, do not show anything
        ) : (
          <div>{`No Result for "${keyword}"`}</div> // When there are no results
        )}
      </div>
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
