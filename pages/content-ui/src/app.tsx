import React, { useEffect } from 'react';
import { handlePlayerSettings } from '@src/player/settingsMenu';
import useSubtitles from '@src/hooks/useSubtitles';

const App: React.FC = () => {
  const subtitles = useSubtitles();

  useEffect(() => {
    chrome.storage.sync.get(['bgCC', 'position'], settings => {
      window.openSubtitle = settings.openSubtitle;
      if (window.location.pathname.includes('/embed/')) {
        if (new URLSearchParams(window.location.search).get('controls') !== '0') {
          handlePlayerSettings(settings, true);
        }
      } else {
        const initInterval = setInterval(() => {
          if (document.querySelector('#ytd-player .ytp-settings-menu .ytp-panel .ytp-panel-menu')) {
            clearInterval(initInterval);
            handlePlayerSettings(settings, false);
          }
        }, 500);
      }
    });
  }, []);

  useEffect(() => {
    const captionContainer = document.querySelector('.ytp-caption-window-container');

    if (captionContainer && subtitles) {
      subtitles.events.forEach(event => {
        setTimeout(() => {
          const captionElement = document.createElement('div');
          captionElement.className = 'ytp-caption-segment';
          captionElement.style.cssText =
            'display: inline-block; white-space: pre-wrap; background: rgba(8, 8, 8, 0.75); font-size: 14.65px; color: rgb(255, 255, 255); fill: rgb(255, 255, 255); font-family: "YouTube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif;';
          captionElement.innerText = event.segs.map(seg => seg.utf8).join('\n');
          captionContainer.appendChild(captionElement);

          setTimeout(() => {
            captionContainer.removeChild(captionElement);
          }, event.dDurationMs);
        }, event.tStartMs);
      });
    }
  }, [subtitles]);

  return null;
};

export default App;
