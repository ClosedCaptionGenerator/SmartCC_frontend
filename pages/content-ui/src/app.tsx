import { getPlayerElement, getSettingsMenuElements, insertMenuItem } from './utils';

const App = () => {
  const handleSubtitleSettings = ({ bgCC, position }, isEmbedded: boolean) => {
    // Select the appropriate player
    const playerElement = getPlayerElement(isEmbedded);

    // Select menu elements within the player
    const { settingsMenu, panelMenu, settingsButton } = getSettingsMenuElements(playerElement);
    const getMessage = chrome.i18n.getMessage;

    // Stop event propagation for the settings menu
    settingsMenu.addEventListener('click', event => event.stopPropagation());

    // Insert custom menu items into the settings panel
    insertMenuItem(panelMenu, bgCC, getMessage('bgCC'));

    // Add event listener to toggle bgCC mode
    const bgCCButton = panelMenu.querySelector('#bgCC-button') as HTMLElement;
    bgCCButton.addEventListener('click', () => {
      bgCC = !bgCC;
      bgCCButton.setAttribute('aria-checked', `${bgCC}`);
      chrome.storage.sync.set({ bgCC });
      window.postMessage({
        source: 'ext',
        type: 'restartSubtitles',
        text: bgCC,
      });
    });

    // Function to update settings menu based on the current state
    const updateSettingsMenu = ({
      playerElement,
      panelMenu,
    }: {
      playerElement: HTMLElement;
      panelMenu: HTMLElement;
    }) => {
      const adsOverlay = playerElement.querySelector('.video-ads.ytp-ad-module .ytp-ad-player-overlay') as HTMLElement;
      const subtitlesButton = playerElement.querySelector('.ytp-subtitles-button') as HTMLElement;
      const subtitlesButtonPressed = subtitlesButton.hasAttribute('aria-pressed') as boolean;

      if (subtitlesButtonPressed && !adsOverlay) {
        chrome.storage.sync.get(['bgCC'], ({ bgCC }) => {
          ['#bgCC-button'].forEach(selector => {
            const selected = panelMenu.querySelector(selector) as HTMLElement;
            selected.style.removeProperty('display');
          });
          const bgCCButton = panelMenu.querySelector('#bgCC-button') as HTMLElement;
          bgCCButton.setAttribute('aria-checked', bgCC);
        });
      } else {
        ['#bgCC-button'].forEach(selector => {
          const selected = panelMenu.querySelector(selector) as HTMLElement;
          selected.style.setProperty('display', 'none');
        });
      }
    };

    // Add event listener to settings button for menu updates
    settingsButton.addEventListener('mouseenter', () => {
      updateSettingsMenu({
        playerElement,
        panelMenu,
      });
    });
  };

  // Get stored settings and initialize the script
  chrome.storage.sync.get(['bgCC', 'position'], settings => {
    window.openSubtitle = settings.openSubtitle;
    if (window.location.pathname.includes('/embed/')) {
      if (new URLSearchParams(window.location.search).get('controls') !== '0') {
        handleSubtitleSettings(settings, true);
      }
    } else {
      const initInterval = setInterval(() => {
        if (document.querySelector('#ytd-player .ytp-settings-menu .ytp-panel .ytp-panel-menu')) {
          clearInterval(initInterval);
          handleSubtitleSettings(settings, false);
        }
      }, 500);
    }
  });

  /*
   * Subtitle
   */

  return null;
};

export default App;
