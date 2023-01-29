import { AccordionAnswersProps } from "../models";

import "../styles/AccordionAnswersTab.css";

const AccordionAnswersTab = ({ content }: AccordionAnswersProps) => {
  return <div className="accordion__content">{content}</div>;
};

export default AccordionAnswersTab;
