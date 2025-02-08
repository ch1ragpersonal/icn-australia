/** @jsxImportSource theme-ui */
import { Box, Heading } from "theme-ui";
import { useLocation } from "@reach/router";
import Seo from "../components/seo";
import VideoGrid from "../components/Livestream-library";

export default function LivestreamsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const filterType = params.get("upcoming") ? "upcoming" : params.get("complete") ? "complete" : "all";

  return (
    <>
      <Seo title="Livestreams" description="Watch ICN Australia livestreams and videos" />
      <Box sx={{ padding: 4 }}>
        <Heading as="h1" sx={{ mb: 4 }}>
          {filterType === "upcoming" ? "Upcoming Livestreams" : filterType === "complete" ? "Completed Livestreams" : "All Livestreams"}
        </Heading>
        <VideoGrid filterType={filterType} />
      </Box>
    </>
  );
}
