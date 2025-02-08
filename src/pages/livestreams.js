/** @jsxImportSource theme-ui */
import { Box, Heading, Flex, Button } from "theme-ui";
import { useLocation } from "@reach/router";
import { useState, useEffect } from "react";
import Seo from "../components/seo";
import VideoGrid from "../components/Livestream-library";

export default function LivestreamsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Read query parameters only on first load
  const [isUpcoming, setIsUpcoming] = useState(params.has("upcoming") || (!params.has("complete") && !params.has("upcoming")));
  const [isComplete, setIsComplete] = useState(params.has("complete") || (!params.has("complete") && !params.has("upcoming")));

  // Ensure at least one filter is always active
  useEffect(() => {
    if (!isUpcoming && !isComplete) {
      setIsUpcoming(true); // Default to Upcoming if both get turned off
    }
  }, [isUpcoming, isComplete]);

  return (
    <>
      <Seo title="Livestreams" description="Watch ICN Australia livestreams and videos" />
      <Box sx={{ padding: 4 }}>
        <Heading as="h1" sx={{ mb: 4 }}>Livestreams</Heading>

        {/* Filter Buttons */}
        <Flex sx={{ justifyContent: "center", gap: 3, mb: 4 }}>
          <Button
            onClick={() => setIsUpcoming(!isUpcoming)}
            sx={{
              backgroundColor: isUpcoming ? "primary" : "#bbb", // Forcing raw color values
              color: "white",
              padding: "14px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: isUpcoming ? "primary" : "#999",
              },
            }}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => setIsComplete(!isComplete)}
            sx={{
              backgroundColor: isComplete ? "primary" : "#bbb", // Forcing raw color values
              color: "white",
              padding: "14px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: isComplete ? "primary" : "#999",
              },
            }}
          >
            Completed
          </Button>
        </Flex>

        {/* Video Grid */}
        <VideoGrid filterType={{ upcoming: isUpcoming, complete: isComplete }} />
      </Box>
    </>
  );
}
