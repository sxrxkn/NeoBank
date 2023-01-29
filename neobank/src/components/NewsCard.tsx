import React from "react";

import { NewsCardProps } from "../models";

import "../styles/NewsCard.css";

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
