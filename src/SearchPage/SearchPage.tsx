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
    if (inView) {
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
    <div sx={{ gap: 2, padding: 10 }}>
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
            }}
          >
            {row.map((category, idx) => {
              const bgColor = bgColors[(rowIndex * 3 + idx) % bgColors.length];

              return (
                <Box
                  key={category.id}
                  sx={{
                    flex: 1,
                    height: 100,
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: bgColor,
                    justifyContent: "space-between",
                    padding: 2,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transition: "transform 0.1s ease-in-out",
                    },
                  }}
                >
                  <Typography variant="subtitle1">{category.name}</Typography>
                  <Box
                    component="img"
                    src={category.icons?.[0]?.url}
                    alt={category.name}
                    sx={{
                      width: 120,
                      height: 120,
                      position: "absolute",
                      transform: "rotate(25deg)",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        );
      })}

      {hasNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="contained"
            color="secondary"
            size="large"
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </Button>
        </Box>
      )}
    </div>
  );
};
export default SearchPage;
