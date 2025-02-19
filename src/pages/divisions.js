import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

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

  // Separate divisions by gender
  const maleDivisions = divisions.filter(division => division.gender === true);
  console.log("Male divisions:" + maleDivisions);
  const femaleDivisions = divisions.filter(division => division.gender === false);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Competitor Divisions</h1>

      {/* Male Divisions Section */}
      <section>
        <h2>Male Divisions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {maleDivisions.map(division => (
            <div
              key={division.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '250px',
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              <img
                src={division.image.file.url}
                alt={division.title}
                style={{ width: '100%', height: 'auto' }}
              />
              <h3>{division.title}</h3>
              <a href={division.pdf.file.url} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Female Divisions Section */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Female Divisions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {femaleDivisions.map(division => (
            <div
              key={division.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '250px',
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              <img
                src={division.image.file.url}
                alt={division.title}
                style={{ width: '100%', height: 'auto' }}
              />
              <h3>{division.title}</h3>
              <a href={division.pdf.file.url} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DivisionsPage;
