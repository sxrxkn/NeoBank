import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import CurrencyBlock from "../components/CurrencyExchangeContainer";
import SubscribeField from "../components/SubscribeField";

import { ReactComponent as BankIcon } from "../assets/imgs/bank-icon.svg";

import { Currencies, News, NewsData } from "../models";
import { defaultCurrenciesArray } from "../utils/data";
import { getNewsData, isApiError } from "../utils/api";

import "../styles/Home.css";

function Home() {
  const [cardData, setCardData] = useState<NewsData[]>([]);
  const [leftButtonDisableState, setLeftButtonDisableState] = useState(true);
  const [rightButtonDisableState, setRightButtonDisableState] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(2);
  const [currenciesValue, setCurrenciesValue] = useState<Currencies[]>([]);

  const slider = document.querySelector<HTMLElement>(".news__slider");

  const rollSlider = (isScrollNext: boolean): void => {
    if (isScrollNext) {
      if (
        (sliderPosition - 500 - slider!.offsetWidth) * -1 >=
        slider!.scrollWidth
      ) {
        setRightButtonDisableState(true);
        setSliderPosition((slider!.scrollWidth - slider!.offsetWidth + 2) * -1);
      } else {
        setLeftButtonDisableState(false);
        setSliderPosition(sliderPosition - 500);
      }
    } else if (sliderPosition + 500 >= 0) {
      setLeftButtonDisableState(true);
      setSliderPosition(2);
    } else {
      setRightButtonDisableState(false);
      setSliderPosition(sliderPosition + 500);
    }
  };

  useEffect(() => {
    const addNewsToDOM = (newsCount = 36) => {
      const newsApiURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${newsCount}&apiKey=ed7793fe31c54696898542bd8ab3e8f9`;
      try {
        getNewsData(newsApiURL).then((data) => {
          const newsArray: NewsData[] = [];
          data["articles"].forEach((news: News) => {
            if (news["description"] && !news["description"].includes("<a")) {
              const image = new Image();
              image.src = news["urlToImage"];

              const description: string = news["description"];
              const link: string = news["url"];
              const urlToImage: string = news["urlToImage"];
              const title: string = news["title"];
              newsArray.push({ description, link, urlToImage, title });
            }
          });
          newsArray.forEach((element, index) => {
            const image = new Image();
            image.src = element.urlToImage;
            image.onload = () => {};
            image.onerror = () => {
              newsArray.splice(index, 1);
            };
          });
          setCardData(newsArray);
        });
      } catch (err) {
        if (isApiError(err)) {
          console.log("Something went wrong. Error: ", err.code);
        }
      }
    };
    addNewsToDOM();
  }, []);

  useEffect(() => {
    const promises: Promise<Currencies>[] = [];

    const getCurrencyExchangeData = (
      currenciesArray = defaultCurrenciesArray
    ) => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "a749e2e215msh156b9c24f55d9e9p1ef9c6jsn8c00b0b8ec88",
          "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
        },
      };

      for (let i = 0; i < currenciesArray.length; i += 1) {
        try {
          const promise: Promise<Currencies> = new Promise(
            (resolve, reject) => {
              const data = currenciesArray[i];
              const from = data["from"];
              const to = data["to"];
              fetch(
                `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1`,
                options
              )
                .then((response) => response.json())
                .then((response) => {
                  const roundValue = (
                    Math.round(response * 100) / 100
                  ).toString();
                  resolve({ from, roundValue });
                });
            }
          );
          promises.push(promise);
        } catch (err) {
          if (isApiError(err))
            console.log("Something went wrong. Error: ", err.code);
        }
      }
    };

    const updateCurrencyExchange = () => {
      getCurrencyExchangeData();
      Promise.all(promises).then((values) => setCurrenciesValue(values));
      promises.splice(0, promises.length);
    };

    updateCurrencyExchange();

    const interval = setInterval(() => {
      updateCurrencyExchange();
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <section className="card-design">
          <div className="card-design__left-block">
            <h2 className="card-design__heading">
              Choose the design you like and apply for card right now
            </h2>
            <Button
              to="/loan"
              buttonClass="card-design__button"
              content="Choose the card"
            />
          </div>
          <div className="card-design__right-block">
            <img
              src={require("../assets/imgs/cardImage1.png")}
              alt="Design-1"
            />
            <img
              src={require("../assets/imgs/cardImage2.png")}
              alt="Design-2"
            />
            <img
              src={require("../assets/imgs/cardImage3.png")}
              alt="Design-3"
            />
            <img
              src={require("../assets/imgs/cardImage4.png")}
              alt="Design-4"
            />
          </div>
        </section>

        <section className="features">
          <div className="features__image">
            <img src={require("../assets/imgs/Illustration.png")} alt="User" />
          </div>
          <div className="features__description">
            <h2 className="features__heading">
              We Provide Many Features You Can Use
            </h2>
            <p className="features__text">
              You can explore the features that we provide with fun and have
              their own functions each feature
            </p>
            <ul className="features__list">
              <li>
                <p>Powerfull online protection.</p>
              </li>
              <li>
                <p>Cashback without borders.</p>
              </li>
              <li>
                <p>Personal design</p>
              </li>
              <li>
                <p>Work anywhere in the world</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="exchange-rate">
          <div className="exchange-rate__left-block">
            <h2 className="exchange-rate__heading">
              Exchange rate in internet bank
            </h2>
            <p className="exchange-rate__text">Currency</p>
            <dl className="exchange-rate__description-list">
              {currenciesValue!.map((value) => (
                <CurrencyBlock
                  from={value.from}
                  to={value.roundValue}
                  key={value.from}
                />
              ))}
            </dl>
            <Link to="" className="exchange-rate__link">
              All courses
            </Link>
          </div>
          <div className="exchange-rate__right-block">
            <p className="exchange-rate__info-text">
              Update every 15 minutes, MSC 09.08.2022
            </p>
            <div className="exchange-rate__image">
              <BankIcon></BankIcon>
            </div>
          </div>
        </section>

        <section className="map">
          <h2 className="map__heading">
            You can use our services anywhere in the world
          </h2>
          <h3 className="map__info-text">
            Withdraw and transfer money online through our application
          </h3>
          <img src={require("../assets/imgs/Huge Global.png")} alt="Map" />
        </section>

        <section className="news">
          <h2 className="news__heading">
            Current news from the world of finance
          </h2>
          <p className="news__info">
            We update the news feed every 15 minutes. You can learn more by
            clicking on the news you are interested in.
          </p>
          <section
            className="news__slider"
            style={{ transform: `translateX(${sliderPosition}px)` }}
          >
            {cardData.map((news) => (
              <NewsCard
                heading={news.title}
                imgSrc={news.urlToImage}
                description={news.description}
                link={news.link}
                key={news.title}
              />
            ))}
          </section>
          <div className="news__buttons">
            <button
              onClick={() => rollSlider(false)}
              className="news__left-button"
              disabled={leftButtonDisableState}
            ></button>
            <button
              onClick={() => rollSlider(true)}
              className="news__right-button"
              disabled={rightButtonDisableState}
            ></button>
          </div>
        </section>
        <section className="newsletter-subscribe">
          <h3 className="newsletter-subscribe__support">Support</h3>
          <p className="newsletter-subscribe__text">
            Subscribe Newsletter & get
          </p>
          <p className="newsletter-subscribe__text-addition">Bank News</p>
          <SubscribeField />
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Home;
