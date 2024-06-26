import React, { useState } from 'react';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { storage, saveSettings, loadSettings } from '@chrome-extension-boilerplate/storage/lib/settingStorage';

const Popup = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const [activeView, setActiveView] = useState('home');
  const [color, setColor] = useState('#FFFFFF');
  const [background, setBackground] = useState('#191919');
  const [font, setFont] = useState('Arial');
  const [spacing, setSpacing] = useState(0);
  const [stroke, setStroke] = useState(0);
  const [size, setSize] = useState(12);

  const resetSettings = () => {
    setColor('#FFFFFF');
    setBackground('#191919');
    setFont('Arial');
    setSpacing(0);
    setStroke(0);
    setSize(12);
  };

  const saveSettings = async () => {
    await storage.set({
      color,
      background,
      font,
      spacing,
      stroke,
      size,
    });
    // const savedSettings = await storage.get();
    // console.log('Saved Settings:', savedSettings);
  };

  return (
    <div className="w-72 bg-gray-800 flex flex-col items-center">
      <div className="flex w-full items-center justify-start h-14 gap-4 px-2">
        <img className="w-10 h-10 rounded" src={chrome.runtime.getURL('popup/logo.png')} />
        <button className="text-sm text-white px-2 py-1" id="home-btn" onClick={() => setActiveView('home')}>
          Home
        </button>
        <button className="text-sm text-white px-2 py-1" id="options-btn" onClick={() => setActiveView('options')}>
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
              <label className="text-gray-600">Font</label>
              <select value={font} onChange={e => setFont(e.target.value)} className="p-2 border rounded w-full h-8">
                <option>Arial</option>
                <option>Verdana</option>
                <option>Helvetica</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label className="text-gray-600">Size</label>
              <input
                type="number"
                className="p-2 border rounded w-full h-8"
                value={size}
                onChange={e => setSize(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label className="text-gray-600">Color</label>
              <div className="relative border rounded h-8 w-full bg-white flex items-center cursor-pointer">
                <input
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
              <label className="text-gray-600">Background</label>
              <div className="relative border rounded h-8 w-full bg-white flex items-center cursor-pointer">
                <input
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
              <label className="text-gray-600">Stroke</label>
              <input
                type="number"
                className="p-2 border rounded w-full h-8"
                value={stroke}
                onChange={e => setStroke(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col w-1/2 px-2">
              <label className="text-gray-600">Spacing</label>
              <input
                type="number"
                className="p-2 border rounded w-full h-8"
                value={spacing}
                onChange={e => setSpacing(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex w-full justify-around mt-4 gap-1">
            <button className="bg-slate-300 text-black py-1.5 px-3 rounded w-24" onClick={resetSettings}>
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
