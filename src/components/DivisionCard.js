// DivisionCard.js
import { hover } from 'framer-motion';
import React from 'react';

const DivisionCard = ({ division }) => {
  return (
    <div className="division-card" 
    // style={{

    //         border: "1px solid #004225",
    //         borderRadius: '8px',
    //         width: "250px",
    //         padding: "1rem",
    //         textAlign: "center",
    //         transition: "transform 0.3s ease-in-out",
    //           "&:hover": {
    //             transform: "scale(1.05)",
    //           },
    // }}
    >
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
        // style={{
        //   marginTop: "1rem",
        //   padding: "0.5rem 1rem",
        //   fontSize: "16px",
        //   borderRadius: "8px",
        //   border: "2px solid #004225",
        //   backgroundColor: "#fff",
        //   color: "#FFB000",
        //   cursor: "pointer",
        //   fontWeight: "bold",
        //   transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        //     "&:hover": {
        //       backgroundColor: "#004225", 
        //       color: "white"
        //     },
        // }}
      >
        More Info
      </button>
    </div>
  );
};

export default DivisionCard;