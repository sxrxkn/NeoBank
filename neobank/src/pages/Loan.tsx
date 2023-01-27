import React, { useRef, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/Loan.css";
import "../styles/Button.css";
import "../styles/transition.css";

import TabNavItem from "../components/TabNavItem";
import TabContent from "../components/TabContent";
import Accordion from "../components/Accordion";
import {
  aboutCardData,
  accordionIssuingData,
  accordionUsingData,
  cashbackData,
  conditions,
} from "../utils/data";

import InfoCard from "../components/InfoCard";
import FormContent from "../components/Form";
import AccordionAnswersTab from "../components/AccordionAnswersTab";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

function Loan() {
  const location = String(useLocation().pathname);
  const [activeTab, setActiveTab] = useState("tab1");
  const [firstAccordionCurrentIndex, setFirstAccordionCurrentIndex] = useState<
    number | null
  >(null);
  const [secondAccordionCurrentIndex, setSecondAccordionCurrentIndex] =
    useState<number | null>(null);

  const myRef = useRef<null | HTMLElement>(null);

  const executeScroll = () =>
    myRef.current!.scrollIntoView({ block: "end", behavior: "smooth" });

  return (
    <>
      <Header location={location}></Header>
      <main>
        <section className="card-description">
          <div>
            <h2 className="card-description__heading">
              Platinum digital credit card
            </h2>
            <p className="card-description__text">
              Our best credit card. Suitable for everyday spending and shopping.
              Cash withdrawals and transfers without commission and interest.
            </p>
            <ul className="card-description__list">
              <li>
                <p className="card-description__features">Up to 160 days</p>
                <p className="card-description__annotation">No percent</p>
              </li>
              <li>
                <p className="card-description__features">Up to 600 000 ₽</p>
                <p className="card-description__annotation">Credit limit</p>
              </li>
              <li>
                <p className="card-description__features">0 ₽</p>
                <p className="card-description__annotation">
                  Card service is free
                </p>
              </li>
            </ul>
            <button
              className="card-description__button button"
              onClick={() => executeScroll()}
            >
              Apply for card
            </button>
          </div>
          <div className="card-description__card-image">
            <img
              src={require("../assets/imgs/cardImage1.png")}
              alt="Card design"
            />
          </div>
        </section>

        <section className="tabs">
          <ul className="tabs__navigation">
            <TabNavItem
              title="About card"
              id="tab1"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              title="Rates and conditions"
              id="tab2"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              title="Cashback"
              id="tab3"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              title="FAQ"
              id="tab4"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </ul>
          <hr className="tabs__divider" />
          <div className="tabs__outlet">
            <TabContent id="tab1" activeTab={activeTab}>
              <section className="about-card about-card_correct-width">
                {aboutCardData.map(
                  ({ icon, content, additionalInfo }, index) => (
                    <InfoCard
                      key={index}
                      styles={{
                        backgroundColor:
                          index % 2 === 0
                            ? "#EAECEE"
                            : "rgba(127, 146, 172, 0.7)",
                      }}
                    >
                      <img
                        className="about-card__icon"
                        src={`${icon}`}
                        alt="icon"
                      ></img>
                      <p className="about-card__content">{content}</p>
                      <p className="about-card__additional-info">
                        {additionalInfo}
                      </p>
                    </InfoCard>
                  )
                )}
              </section>
            </TabContent>
            <TabContent id="tab2" activeTab={activeTab}>
              <section>
                <ul className="conditions">
                  {conditions.map(({ content, annotation }) => (
                    <li className="conditions__list-item" key={content}>
                      <div className="conditions__content">
                        <span>{content}</span>
                      </div>
                      <p className="conditions__annotation">{annotation}</p>
                      <hr className="conditions_divider" />
                    </li>
                  ))}
                </ul>
              </section>
            </TabContent>
            <TabContent id="tab3" activeTab={activeTab}>
              <section className="about-card ">
                {cashbackData.map(({ content, cashback }, index) => (
                  <InfoCard
                    key={content}
                    styles={{
                      backgroundColor:
                        index % 2 === 0
                          ? "#EAECEE"
                          : "rgba(136, 179, 184, 0.6)",
                      height: "160px",
                    }}
                  >
                    <p className="about-card__info">{content}</p>
                    <p className="about-card__cashback">{cashback}</p>
                  </InfoCard>
                ))}
              </section>
            </TabContent>
            <TabContent id="tab4" activeTab={activeTab}>
              <section className="accordion">
                <h3 className="accordion__heading">
                  Issuing and receiving a card
                </h3>
                {accordionIssuingData.map(({ title, content }, index) => (
                  <div
                    key={title}
                    onClick={() => {
                      setFirstAccordionCurrentIndex(
                        index === firstAccordionCurrentIndex ? null : index
                      );
                    }}
                  >
                    <Accordion
                      title={title}
                      isOpened={index === firstAccordionCurrentIndex}
                    >
                      <CSSTransition
                        in={index === firstAccordionCurrentIndex}
                        timeout={150}
                        classNames="alert"
                        unmountOnExit
                      >
                        <AccordionAnswersTab
                          content={content}
                        ></AccordionAnswersTab>
                      </CSSTransition>
                    </Accordion>
                  </div>
                ))}
                <h3 className="accordion__heading">Using a credit card</h3>
                {accordionUsingData.map(({ title, content }, index) => (
                  <div
                    key={title}
                    onClick={() => {
                      setSecondAccordionCurrentIndex(
                        index === secondAccordionCurrentIndex ? null : index
                      );
                    }}
                  >
                    <Accordion
                      title={title}
                      isOpened={index === firstAccordionCurrentIndex}
                    >
                      {index === secondAccordionCurrentIndex && (
                        <AccordionAnswersTab
                          content={content}
                        ></AccordionAnswersTab>
                      )}
                    </Accordion>
                  </div>
                ))}
              </section>
            </TabContent>
          </div>
        </section>

        <section className="get-card-tutorial">
          <h2 className="get-card-tutorial__heading">How to get a card</h2>
          <ul className="get-card-tutorial__list">
            <li>
              <div className="get-card-tutorial__item">
                <div className="get-card-tutorial__item-number">
                  <span>1</span>
                </div>
                <hr />
              </div>
              <p>
                Fill out an online application - you do not need to visit the
                bank
              </p>
            </li>
            <li>
              <div className="get-card-tutorial__item">
                <div className="get-card-tutorial__item-number">
                  <span>2</span>
                </div>
                <hr />
              </div>
              <p>
                Find out the bank's decision immediately after filling out the
                application
              </p>
            </li>
            <li>
              <div className="get-card-tutorial__item">
                <div className="get-card-tutorial__item-number">
                  <span>3</span>
                </div>
                <hr />
              </div>
              <p>
                The bank will deliver the card free of charge, wherever
                convenient, to your city
              </p>
            </li>
          </ul>
        </section>

        <section className="form-container" ref={myRef}>
          <FormContent />
        </section>
      </main>

      <Footer></Footer>
    </>
  );
}

export default Loan;
