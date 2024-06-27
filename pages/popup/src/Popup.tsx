import { useCallback, useEffect, useState } from 'react';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { subtitleSettingStorage } from '@chrome-extension-boilerplate/storage';

type View = 'home' | 'options';

const Popup = () => {
  const subtitleSetting = useStorageSuspense(subtitleSettingStorage);

  const [activeView, setActiveView] = useState<View>('home');
  const [color, setColor] = useState<string>(subtitleSetting.color);
  const [background, setBackground] = useState<string>(subtitleSetting.background);
  const [font, setFont] = useState<string>(subtitleSetting.font);
  const [spacing, setSpacing] = useState<number>(subtitleSetting.spacing);
  const [stroke, setStroke] = useState<number>(subtitleSetting.stroke);
  const [size, setSize] = useState<number>(subtitleSetting.size);

  const saveSettings = useCallback(() => {
    subtitleSettingStorage.saveSettings({
      color,
      background,
      font,
      spacing,
      stroke,
      size,
    });
  }, [color, background, font, spacing, stroke, size]);

  return (
    <div className="w-72 bg-gray-800 flex flex-col items-center">
      <div className="flex w-full items-center justify-start h-14 gap-4 px-2">
        <img className="w-10 h-10 rounded" alt="smartCC logo" src={chrome.runtime.getURL('popup/logo.png')} />
        <button className="text-sm text-white" id="home-btn" onClick={() => setActiveView('home')}>
          Home
        </button>
        <button className="text-sm text-white" id="options-btn" onClick={() => setActiveView('options')}>
          Options
        </button>
      </div>
      {activeView === 'home' && (
        <div className="w-full bg-slate-100 shadow-lg flex flex-col items-center justify-between p-4">
          <h2 className="w-full text-2xl font-bold text-center text-gray-800 mb-2">SmartCC</h2>
          <p className="w-full text-xs text-center mb-4">
            Generate AI-powered closed captions that emphasize background music and sound effects.
          </p>
          <div className="flex w-full justify-around mt-4 gap-1">
            <button className="bg-slate-300 text-black py-1.5 px-3 rounded w-24" onClick={() => window.close()}>
              Cancel
            </button>
            <button className="bg-teal-500 text-white py-1.5 px-3 rounded w-24">Create</button>
          </div>
        </div>
      )}
      {activeView === 'options' && (
        <div className="w-full bg-slate-100 p-4 shadow-lg flex flex-col items-center justify-between">
          <h2 className="w-full text-2xl font-bold text-center text-gray-800 mb-2">Subtitle Options</h2>
          <p className="w-full text-center mb-4">Customize your subtitles to match your preferences.</p>
          <div className="flex flex-wrap w-full mb-2">
            <div className="flex flex-col w-1/2 px-2">
              <label htmlFor="font-type" className="text-gray-600">
                Font
              </label>
              <select
                id="font-type"
                value={font}
                onChange={e => setFont(e.target.value)}
                className="p-2 border rounded w-full h-8">
                <option>Arial</option>
                <option>Verdana</option>
                <option>Helvetica</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label htmlFor="font-size" className="text-gray-600">
                Size
              </label>
              <input
                id="font-size"
                type="number"
                className="p-2 border rounded w-full h-8"
                value={size}
                onChange={e => setSize(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label htmlFor="font-color" className="text-gray-600">
                Color
              </label>
              <div className="relative border rounded h-8 w-full bg-white flex items-center cursor-pointer">
                <input
                  id="font-color"
                  type="color"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  style={{ padding: '0', margin: '0' }}
                />
                <div className="flex items-center pl-2 bg-white flex-grow">
                  <div className="w-5 h-5 border" style={{ backgroundColor: color }}></div>
                  <span className="text-gray-800 ml-2">{color.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label htmlFor="caption-bg-color" className="text-gray-600">
                Background
              </label>
              <div className="relative border rounded h-8 w-full bg-white flex items-center cursor-pointer">
                <input
                  id="caption-bg-color"
                  type="color"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={background}
                  onChange={e => setBackground(e.target.value)}
                  style={{ padding: '0', margin: '0' }}
                />
                <div className="flex items-center pl-2 bg-white flex-grow">
                  <div className="w-5 h-5 border" style={{ backgroundColor: background }}></div>
                  <span className="text-gray-800 ml-2">{background.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label htmlFor="caption-stroke" className="text-gray-600">
                Stroke
              </label>
              <input
                id="caption-stroke"
                type="number"
                className="p-2 border rounded w-full h-8"
                value={stroke}
                onChange={e => setStroke(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label htmlFor="caption-spacing" className="text-gray-600">
                Spacing
              </label>
              <input
                id="caption-spacing"
                type="number"
                className="p-2 border rounded w-full h-8"
                value={spacing}
                onChange={e => setSpacing(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex w-full justify-around mt-4 gap-1">
            <button
              className="bg-slate-300 text-black py-1.5 px-3 rounded w-24"
              onClick={subtitleSettingStorage.resetSettings}>
              Reset
            </button>
            <button className="bg-teal-500 text-white py-1.5 px-3 rounded w-24" onClick={saveSettings}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occur</div>);
