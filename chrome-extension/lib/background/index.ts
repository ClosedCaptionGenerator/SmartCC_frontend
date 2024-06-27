import 'webextension-polyfill';
import { subtitleSettingStorage } from '@chrome-extension-boilerplate/storage';

subtitleSettingStorage.get().then(settings => {
  console.log('subtitle settings', settings);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/lib/background/index.ts' and save to reload.");
