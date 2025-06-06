import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./common/components/LoadingSpinner";
import useExchangeToken from "./hooks/useExchangeToken";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
  () => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage")
);
const PlaylistDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);

// 0.Side bar (플레이리스트,메뉴)
// 1.Home page  /
// 2.Search page /search
// 3.Search result page /search/:keyword
// 4.Playlist detail page /playlist/:id
// 5.(Mobile) Playlist page /playlist

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          {/* <Route path="/Playlist" element={<PlaylistPage/}/> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
