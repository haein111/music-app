import React from "react";
import NewReleases from "./NewReleases";
import KpopSection from "./KpopSection";
import RecommendedArtists from "./RecommendedArtists";
import { styled } from "@mui/material";
import { Box } from "@mui/material";

const ScrollContainer = styled(Box)({
  overflowY: "scroll",
  overflowX: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const HomePage = () => {
  return (
    <ScrollContainer style={{ maxHeight: "100dvh", overflowY: "auto" }}>
      <NewReleases />
      <KpopSection />
      <RecommendedArtists />
    </ScrollContainer>
  );
};

export default HomePage;
