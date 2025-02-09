/** @jsxImportSource theme-ui */
import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Heading, Input, Flex, Text } from "theme-ui";
import { format } from "date-fns";

const ResultsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCompetitionResults(sort: { date: DESC }) {
        nodes {
          competitionName
          results {
            results
          }
          date
        }
      }
    }
  `);

  const results = data.allContentfulCompetitionResults.nodes;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState(results);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredResults = results.filter((result) => {
      return (
        result.competitionName.toLowerCase().includes(lowerCaseSearchTerm) ||
        (result.results &&
          result.results.results.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });
    setFilteredResults(newFilteredResults);
  }, [searchTerm, results]);

  // Group results by year
  const groupResultsByYear = (resultsToGroup) => {
    const grouped = {};
    resultsToGroup.forEach((result) => {
      if (!result.date) return; // Skip results with no date
      const year = new Date(result.date).getFullYear();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(result);
    });
    return grouped;
  };

  const groupedFilteredResults = groupResultsByYear(filteredResults);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Heading as="h1" sx={{ fontSize: "32px", marginBottom: "20px", textAlign: "center" }}>
        Competition Results
      </Heading>

      {/* Search Input */}
      <Flex sx={{ justifyContent: "center", mb: 4 }}>
        <Input
          type="text"
          placeholder="Search by competition name or results..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: "400px", // Limit width for better aesthetics
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </Flex>

      {/* Results Grid */}
      <Box>
        {Object.keys(groupedFilteredResults)
          .sort((a, b) => b - a) // Sort years in descending order
          .map((year) => (
            <Box key={year} sx={{ marginBottom: "40px" }}>
              <Heading as="h2" sx={{ fontSize: "24px", marginBottom: "10px" }}>
                {year}
              </Heading>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {groupedFilteredResults[year].map((result, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #eee",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      backgroundColor: "white"
                    }}
                  >
                    <Heading as="h3" sx={{ fontSize: "18px", marginBottom: "10px" }}>
                      {result.competitionName}
                    </Heading>
                    <Text sx={{ marginBottom: "5px" }}>
                      {result.date ? format(new Date(result.date), "MMMM dd, yyyy") : "Date Not Available"}
                    </Text>
                    <Text>{result.results.results}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
      </Box>
       {filteredResults.length === 0 && (
            <Text sx={{ textAlign: "center", marginTop: "20px" }}>
                No results found matching your search.
            </Text>
        )}
    </Box>
  );
};

export default ResultsPage;