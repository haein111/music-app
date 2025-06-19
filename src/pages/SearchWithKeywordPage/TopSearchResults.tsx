import { Box } from "@mui/material";
import { SearchResponse } from "../../models/search";
import TopResult from "./TopResult";
import TopSongs from "./TopSongs";

const TopSearchResults = ({ tracks }: SearchResponse) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <TopResult item={tracks?.items[0]} />
      </Box>
      <Box>
        <TopSongs items={tracks?.items} />
      </Box>
    </Box>
  );
};

export default TopSearchResults;
