import React from "react";

import "../styles/NewsCard.css";

interface NewsCardProps {
  heading: string;
  imgSrc: string;
  description: string;
  link: string;
}

function NewsCard({ heading, imgSrc, description, link }: NewsCardProps) {
  return (
    <div className="news__slide">
      <h2 className="news__slide-heading">{heading}</h2>
      <img className="news__slide-img" src={imgSrc} alt="" />
      <p className="news__slide-description">{description}</p>
      <a
        className="news__slide-link"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        Open the news article
      </a>
    </div>
  );
}
export default NewsCard;
