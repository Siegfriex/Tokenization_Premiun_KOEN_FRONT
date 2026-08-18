import { BilingualText } from '../../../types';

export type FloresCitationItem = {
  id: string;
  name: BilingualText;
  totalTokens: number;
  ratio: number;
  isBaseline?: boolean;
  isTargetHangul?: boolean;
};
