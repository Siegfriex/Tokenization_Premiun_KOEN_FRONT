import { BilingualText } from '../../../types';

export type PipelineStep = {
  id: string;
  step: string;
  name: string;
  title: BilingualText;
  description: BilingualText;
  highlight: boolean;
};
