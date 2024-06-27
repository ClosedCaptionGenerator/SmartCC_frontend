import { useEffect, useState } from 'react';
import { data } from '@src/constants/data';

export type SubtitleSegment = {
  utf8: string;
};

export type SubtitleEvent = {
  tStartMs: number;
  dDurationMs: number;
  segs: SubtitleSegment[];
};

export type Subtitles = {
  wireMagic: string;
  pens: object[];
  wsWinStyles: object[];
  wpWinPositions: object[];
  events: SubtitleEvent[];
};

const useSubtitles = () => {
  const [subtitles, setSubtitles] = useState<Subtitles | null>(null);

  useEffect(() => {
    // TODO: Fetch subtitles from the server
    setSubtitles(data);
  }, []);

  return subtitles;
};

export default useSubtitles;
