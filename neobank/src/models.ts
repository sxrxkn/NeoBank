export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export interface AccordionAnswersProps {
  content: React.ReactNode;
}

export interface InfoCardProps {
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

export interface ApiError {
  code: number;
  error: string;
}

export interface News {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ButtonProps {
  buttonClass: string;
  to: string;
  content: string;
}

export interface HeaderProps {
  location?: string;
}

export interface NewsCardProps {
  heading: string;
  imgSrc: string;
  description: string;
  link: string;
}

export interface TabContentProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

export interface TabNavProps {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
