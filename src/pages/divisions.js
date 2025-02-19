import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Heading, Button, Flex } from "theme-ui";
import Seo from '../components/seo';

const DivisionsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulDivision {
        nodes {
          id
          gender
          title
          image {
            file {
              url
            }
          }
          pdf {
            file {
              url
            }
          }
        }
      }
    }
  `);

  const divisions = data.allContentfulDivision.nodes;

  // Separate divisions by gender (assuming gender true = male, false = female)
  const maleDivisions = divisions.filter(division => division.gender === true);
  const femaleDivisions = divisions.filter(division => division.gender === false);

  return (
    <div style={{ padding: '2rem' }}>
    <Seo title="Divisions" description="ICN Australia Competitor Divisions" />

      <style>
        {`
          .division-card {
            border: 1px solid #004225;
            border-radius: 8px;
            width: 250px;
            padding: 1rem;
            text-align: center;
            transition: transform 0.3s ease-in-out;
          }
          .division-card:hover {
            transform: scale(1.05);
          }
          .more-info-button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            font-size: 16px;
            border-radius: 8px;
            border: 2px solid #004225;
            background-color: #fff;
            color: #FFB000;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
          }
          .more-info-button:hover {
            background-color: #004225;
            color: white;
          }
        `}
      </style>
      
      <Heading as="h1" sx={{ mb: 4 }}>Competitor Divisions</Heading>

      {/* Male Divisions Section */}
      <section>
        <h2>Male Divisions</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-evenly'
          }}
        >
          {maleDivisions.map(division => (
            <div key={division.id} className="division-card">
              <img
                src={division.image.file.url}
                alt={division.title}
                style={{ width: '100%', height: 'auto' }}
              />
              <h3>{division.title}</h3>
              <button
                className="more-info-button"
                onClick={() =>
                  window.open(division.pdf.file.url, '_blank', 'noopener,noreferrer')
                }
              >
                More Info
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Female Divisions Section */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Female Divisions</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-evenly'
          }}
        >
          {femaleDivisions.map(division => (
            <div key={division.id} className="division-card">
              <img
                src={division.image.file.url}
                alt={division.title}
                style={{ width: '100%', height: 'auto' }}
              />
              <h3>{division.title}</h3>
              <button
                className="more-info-button"
                onClick={() =>
                  window.open(division.pdf.file.url, '_blank', 'noopener,noreferrer')
                }
              >
                More Info
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DivisionsPage;
