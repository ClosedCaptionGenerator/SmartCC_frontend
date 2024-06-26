import { BaseStorage, createStorage, StorageType } from './base';

interface SubtitleSettings {
  color: string;
  background: string;
  font: string;
  spacing: number;
  stroke: number;
  size: number;
}

const storageKey = 'subtitle-settings';

export const storage = createStorage<SubtitleSettings>(
  storageKey,
  {
    color: '#FFFFFF',
    background: '#191919',
    font: 'Arial',
    spacing: 0,
    stroke: 0,
    size: 12,
  },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

export const saveSettings = async (settings: SubtitleSettings) => {
  await storage.set(settings);
};

export const loadSettings = async (): Promise<SubtitleSettings> => {
  return storage.get();
};
