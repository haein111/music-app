import { Box, styled, Typography } from "@mui/material";
import { SimplifiedAlbum } from "../../models/album";

const AlbumCardCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100px",
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
}));

const AlbumImage = styled("img")(() => ({
  width: "100%",
  maxWidth: "140px",
  height: "100%",
  maxHeight: "140px",
  display: "block",
  objectFit: "cover",
  flexShrink: 0,
  overflow: "hidden",
}));

const TruncatedText = styled(Typography)({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

interface AlbumCardProps {
  album: SimplifiedAlbum;
}
const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <AlbumCardCardContainer>
      <Box sx={{ width: "100%" }}>
        {album?.images?.[0]?.url && (
          <AlbumImage
            src={album?.images?.[0]?.url}
            alt={album?.name ?? "album"}
          />
        )}
      </Box>

      <Box sx={{ padding: "4px", width: "100%" }}>
        <TruncatedText variant="subtitle2" fontWeight="bold">
          {album?.name}
        </TruncatedText>
        <Typography variant="subtitle2" color="text.secondary">
          {album?.artists?.[0]?.name}
        </Typography>
      </Box>
    </AlbumCardCardContainer>
  );
};

export default AlbumCard;
