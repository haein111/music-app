import { Box, Typography, Button } from "@mui/material";
import useGetSearchCategories from "../hooks/useGetSearchCategories";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LoadingSpinner from "../common/components/LoadingSpinner";

const bgColors = [
  "#E13300",
  "#1DB954",
  "#535353",
  "#8D67AB",
  "#E8115B",
  "#158A08",
  "#27856A",
  "#1E3264",
  "#B49BC8",
  "#FF4632",
  "#E9C46A",
  "#2A9D8F",
  "#264653",
  "#F4A261",
  "#9C27B0",
];

const SearchPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetSearchCategories();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isError) return <div>Error fetching data</div>;
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  const categories =
    data?.pages.flatMap((page) => page.categories?.items ?? []) ?? [];

  const grouped: any[][] = [];

  for (let i = 0; i < categories.length; i += 3) {
    grouped.push(categories.slice(i, i + 3));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        height: "600px",
        padding: "16px",
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ height: 20, mb: 2 }}>
        Browse All
      </Typography>
      <Box
        sx={{
          overflowY: "auto",
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignContent: "flex-start",
          flex: 1,
          padding: "8px",
          width: "100%",

          minHeight: 0,
          overflowX: "hidden",
          maxWidth: "100%",

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >
        {grouped.map((row, rowIndex) => {
          return (
            <Box
              key={rowIndex}
              sx={{
                justifyContent: "space-between",
                boxSizing: "border-box",
                display: "flex",
                width: "100%",
                gap: 2,

                "&hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              {row.map((category, idx) => {
                const bgColor =
                  bgColors[(rowIndex * 3 + idx) % bgColors.length];

                return (
                  <Box
                    key={category.id}
                    sx={{
                      flex: 1,
                      height: 150,
                      borderRadius: "8px",
                      backgroundColor: bgColor,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 2,
                      position: "relative",
                      overflow: "hidden",
                      transition: "transform 0.2s ease-in-out",

                      "&:hover": {
                        transition: "scale(1.04)",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ zIndex: 1 }}
                    >
                      {category.name}
                    </Typography>
                    <Box
                      component="img"
                      src={category.icons?.[0]?.url}
                      alt={category.name}
                      sx={{
                        width: 150,
                        height: 150,
                        right: -10,
                        bottom: -10,
                        opacity: 0.7,
                        position: "absolute",
                        transform: "rotate(25deg)",
                        marginLeft: "auto",
                        zIndex: 0,
                      }}
                    />
                  </Box>
                );
              })}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, i) => (
                  <Box key={`empty-${i}`} sx={{ flex: 1 }} />
                ))}
            </Box>
          );
        })}

        {/* 무한 스크롤 */}
        <Box ref={ref} sx={{ height: 1 }}>
          {isFetchingNextPage && <LoadingSpinner />}
        </Box>
      </Box>
    </Box>
  );
};
export default SearchPage;
