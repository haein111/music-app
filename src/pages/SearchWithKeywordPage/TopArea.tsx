import { Box } from "@mui/material";
import { SearchResponse } from "../../models/search";
import TopResult from "./TopResult";
import TopSongs from "./TopSongs";

const TopArea = ({ tracks }: SearchResponse) => {
  return (
    <Box sx={{ display: "flex", width: "100%", flex: 1 }}>
      <Box sx={{ flex: 5 }}>
        <TopResult item={tracks?.items[0]} />
      </Box>
      <Box sx={{ flex: 5 }}>
        <TopSongs items={tracks?.items} />
      </Box>
    </Box>
  );
};

export default TopArea;
