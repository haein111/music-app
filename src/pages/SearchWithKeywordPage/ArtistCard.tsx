import { Avatar, Box, styled, Typography } from "@mui/material";
import { Artist } from "../../models/artist";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const ArtistCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  borderRadius: "6px",
  padding: "8px",
  position: "relative",
  transform: "transform 0.2s ease-in-out",
  alignItems: "flex-start",
  gap: 2,

  "&: hover": {
    transform: "scale(1.04)",
    backgroundColor: theme.palette.action.hover,
  },
  "&: hover .overlay": {
    opacity: 1,
  },
}));

const ArtistImage = styled(Avatar)(() => ({
  width: "100%",
  // maxWidth: "100px",
  height: "100%",
  // maxHeight: "100px",
  display: "block",
  objectFit: "cover",
  flexShrink: 0,
  overflow: "hidden",
}));

const PlayArrowButton = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  width: "34px",
  height: "34px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 4px 4px rgba(0,0,0,1)",
}));

interface ArtistsCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistsCardProps) => {
  return (
    <ArtistCardContainer>
      <Box>
        {artist?.images?.[0]?.url && (
          <ArtistImage
            src={artist?.images?.[0]?.url}
            alt={artist?.name ?? "artist"}
          />
        )}

        {/* button */}
        <Box
          className="overlay"
          sx={{
            opacity: 0,
            position: "absolute",
            top: 0,
            bottom: -100,
            left: 0,
            right: -60,
            transition:
              "opacity 0.2s ease-in-out, background-color 0.2s ease-in-out",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          <PlayArrowButton>
            <PlayArrowIcon sx={{ color: "black" }} />
          </PlayArrowButton>
        </Box>
      </Box>

      <Box sx={{ padding: "4px" }}>
        <Typography variant="body2" fontWeight="bold">
          {artist?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Artist
        </Typography>
      </Box>
    </ArtistCardContainer>
  );
};

export default ArtistCard;
