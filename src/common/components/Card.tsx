import { styled, Typography } from "@mui/material";
import React from "react";
import PlayButton from "./PlayButton";

const CardContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  minWidth: "100px",
  padding: "8px",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  overflow: "hidden",
  transition: "transform 0.3s ease",

  "&:hover": {
    transform: "scale(1.03)",
  },
  "&:hover .overlayPlayButton": {
    opacity: 0.95,
  },
}));

const CardImage = styled("img")({
  width: "100%",
  borderRadius: "8px",
});

const OverlayPlayButton = styled("div")({
  position: "absolute",
  right: "12px",
  bottom: "60px",
  opacity: 0,
  transition: "opacity 0.3s",
});

const TypographyContainer = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

interface CardProps {
  image: string;
  name: string;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <CardImage src={image} alt={name} />
      <OverlayPlayButton className="overlayPlayButton">
        <PlayButton />
      </OverlayPlayButton>
      <TypographyContainer variant="h2" fontWeight="bold">
        {name}
      </TypographyContainer>
      <TypographyContainer variant="body1" color="text.secondary">
        {artistName ?? "Unknown"}
      </TypographyContainer>
    </CardContainer>
  );
};

export default Card;
