import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import React, { useState } from 'react';

const Popup = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const [activeView, setActiveView] = useState('home');
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
      {activeView === 'home' ? (
        <div className="w-full bg-slate-100 shadow-lg flex flex-col items-center justify-between p-4">
          <h2 className="w-full text-2xl font-bold text-center text-gray-800 mb-2">SmartCC</h2>
          <p className="w-full text-xs text-center mb-4">
            Generate AI-powered closed captions that emphasize background music and sound effects.
          </p>
          <div className="flex w-full justify-around mt-4 gap-1">
            <button className="bg-slate-300 text-black py-1.5 px-3 rounded w-24">Cancel</button>
            <button className="bg-teal-500 text-white py-1.5 px-3 rounded w-24">Create</button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-slate-100 p-4 shadow-lg flex flex-col items-center justify-between">
          <h2 className="w-full text-2xl font-bold text-center text-gray-800 mb-2">Subtitle Options</h2>
          <p className="w-full text-center mb-4">Customize your subtitles to match your preferences.</p>
          <div className="flex flex-wrap justify-between w-full mb-2">
            <div className="flex flex-col w-4/12 px-2">
              <label className="text-gray-600">Font</label>
              <select className="p-2 border rounded w-full">
                <option>Arial</option>
              </select>
            </div>
            <div className="flex flex-col w-4/12 px-2">
              <label className="text-gray-600">Spacing</label>
              <input type="number" className="p-2 border rounded w-full" defaultValue="0" />
            </div>

            <div className="flex flex-col w-1/3 px-2">
              <label className="text-gray-600">Color</label>
              <input
                type="color"
                className="form-input p-2 border rounded w-full h-10"
                style={{ backgroundColor: 'transparent' }}
                defaultValue="#FFFFFF"
              />
            </div>
            <div className="flex flex-col w-4/12 px-2">
              <label className="text-gray-600">Size</label>
              <input type="number" className="p-2 border rounded w-full" defaultValue="12" />
            </div>
            <div className="flex flex-col w-4/12 px-2">
              <label className="text-gray-600">Stroke</label>
              <input type="number" className="p-2 border rounded w-full" defaultValue="0" />
            </div>
            <div className="flex flex-col w-1/3 px-2">
              <label className="text-gray-600">Background</label>
              <input
                type="color"
                className="form-input p-2 border rounded w-full h-10"
                style={{ backgroundColor: 'transparent' }}
                defaultValue="#191919"
              />
            </div>
          </div>
          <div className="flex w-full justify-around mt-4 gap-1">
            <button className="bg-slate-300 text-black py-1.5 px-3 rounded w-24">Reset</button>
            <button className="bg-teal-500 text-white py-1.5 px-3 rounded w-24">Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occur</div>);
