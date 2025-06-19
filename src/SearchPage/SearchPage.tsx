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
  }, [inView]);

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
        gap: 2,
        padding: 10,
        overflowY: "auto",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
      }}
    >
      {grouped.map((row, rowIndex) => {
        const isLastRow = rowIndex === grouped.length - 1;
        return (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
              boxSizing: "border-box",
              "&hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            {row.map((category, idx) => {
              const bgColor = bgColors[(rowIndex * 3 + idx) % bgColors.length];

              return (
                <Box
                  key={category.id}
                  sx={{
                    flex: 1,
                    height: 150,
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: bgColor,
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
                      position: "absolute",
                      transform: "rotate(25deg)",
                      marginLeft: "auto",
                      zIndex: 0,
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        );
      })}

      {/* 무한 스크롤 */}
      <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
    </Box>
  );
};
export default SearchPage;
