import { BilingualText } from '../../../types';

export type NavSection = {
  id: string;
  /** Compact step code, always visible — "S3", "S4.5", "결론"/"Result". */
  code: BilingualText;
  /** Descriptive name, shown only for the active section (see StoryProgress). */
  name: BilingualText;
};
