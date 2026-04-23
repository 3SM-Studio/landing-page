export type LegalTocItem = {
  id: string;
  title: string;
  level: 2 | 3;
  children?: LegalTocItem[];
};
