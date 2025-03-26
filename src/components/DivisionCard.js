// DivisionCard.js
import React from 'react';

const DivisionCard = ({ division }) => {
  return (
    <div className="division-card">
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
  );
};

export default DivisionCard;