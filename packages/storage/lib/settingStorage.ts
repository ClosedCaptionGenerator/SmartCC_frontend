import { BaseStorage, createStorage, StorageType } from './base';

interface SubtitleSetting {
  color: string;
  background: string;
  font: string;
  spacing: number;
  stroke: number;
  size: number;
}

const defaultSubtitleSetting: SubtitleSetting = {
  color: '#FFFFFF',
  background: '#191919',
  font: 'Arial',
  spacing: 0,
  stroke: 0,
  size: 12,
};

type SubtitleSettingStorage = BaseStorage<SubtitleSetting> & {
  saveSettings: (settings: SubtitleSetting) => Promise<void>;
  loadSettings: () => Promise<SubtitleSetting>;
  resetSettings: () => Promise<void>;
};

const storageKey = 'subtitle-settings';

const storage = createStorage<SubtitleSetting>(storageKey, defaultSubtitleSetting, {
  storageType: StorageType.Sync,
  liveUpdate: true,
});

export const subtitleSettingStorage: SubtitleSettingStorage = {
  ...storage,
  saveSettings: async (settings: SubtitleSetting) => {
    await storage.set(settings);
  },
  loadSettings: async () => {
    return storage.get();
  },
  resetSettings: async () => {
    await storage.set(defaultSubtitleSetting);
  },
};
