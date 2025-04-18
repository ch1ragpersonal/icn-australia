import React from "react";
import { Image, Link } from "theme-ui";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import "./presidentCard.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const PresidentCard = ({ president }) => {
  const { name, title, photo, bio, contact } = president;
  console.log("📸 president.photo is:", president.photo);
  
  return (
    <div className="president-card">
      {photo && (
        <Image src={photo} alt={name} className="president-photo" sx={{
          display: 'block',
          mx: 'auto',           // shorthand for margin-left/right: auto
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          objectPosition: 'center',
        }}/>
      )}
      <div className="card-content">
        <h2 className="president-name">{name}</h2>
        <h3 className="president-title">{title}</h3>
        <div className="president-description">
          {bio && documentToReactComponents(JSON.parse(bio.raw))}
        </div>
        <div className="contact-links">
          <Link
              href={'mailto:' + contact}
              sx={{ color: "primary" }}
                >
              <FaEnvelope />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PresidentCard;
