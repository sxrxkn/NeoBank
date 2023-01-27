export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpened: boolean;
}

export interface AccordionAnswersProps {
  content: React.ReactNode;
}

export interface NewsCardProps {
  styles: React.CSSProperties;
  children: React.ReactNode;
}

export interface NewsData {
  description: string;
  link: string;
  urlToImage: string;
  title: string;
}

export interface CurrencyBlockProps {
  from: string;
  to: string;
}

export interface Currencies {
  from: string;
  roundValue: string;
}

export interface NaviagtionListData {
  func?: () => void;
  children?: React.ReactNode;
}
