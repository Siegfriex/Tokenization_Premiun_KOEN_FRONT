import { BilingualText } from '../../../types';

export type DomainDistributionItem = {
  id: string;
  label: BilingualText;
  ratio: number;
  koTokens: number;
  enTokens: number;
};
