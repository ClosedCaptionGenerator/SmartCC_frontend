import { getPlayerElement, getSettingsMenuElements } from '@src/utils';

export const handlePlayerSettings = ({ bgCC, position }: { bgCC: boolean; position: string }, isEmbedded: boolean) => {
  const playerElement = getPlayerElement(isEmbedded);
  const { settingsMenu, panelMenu, settingsButton } = getSettingsMenuElements(playerElement);
  const getMessage = chrome.i18n.getMessage;

  settingsMenu.addEventListener('click', (event: MouseEvent) => event.stopPropagation());

  const bgCCButton = document.createElement('div');
  bgCCButton.className = 'ytp-menuitem';
  bgCCButton.setAttribute('role', 'menuitemcheckbox');
  bgCCButton.setAttribute('aria-checked', `${bgCC}`);
  bgCCButton.setAttribute('tabindex', '0');
  bgCCButton.id = 'bgCC-button';
  bgCCButton.innerHTML = `
    <div class="ytp-menuitem-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7909 14.8818L10.4818 12.6L10.5091 12.5727C12.0909 10.8091 13.2182 8.78182 13.8818 6.63636H16.5455V4.81818H10.1818V3H8.36364V4.81818H2V6.62727H12.1545C11.5455 8.38182 10.5818 10.0455 9.27273 11.5C8.42727 10.5636 7.72727 9.53636 7.17273 8.45455H5.35455C6.01818 9.93636 6.92727 11.3364 8.06364 12.6L3.43636 17.1636L4.72727 18.4545L9.27273 13.9091L12.1 16.7364L12.7909 14.8818ZM17.9091 10.2727H16.0909L12 21.1818H13.8182L14.8364 18.4545H19.1545L20.1818 21.1818H22L17.9091 10.2727ZM15.5273 16.6364L17 12.7L18.4727 16.6364H15.5273Z" fill="white" stroke-width="0.3" stroke="#000"/>
      </svg>
    </div>
    <div class="ytp-menuitem-label">${getMessage('bgCC')}</div>
    <div class="ytp-menuitem-content"><div class="ytp-menuitem-toggle-checkbox"></div></div>
  `;
  panelMenu.appendChild(bgCCButton);

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

  const updateSettingsMenu = () => {
    const adsOverlay = playerElement.querySelector('.video-ads.ytp-ad-module .ytp-ad-player-overlay') as HTMLElement;
    const subtitlesButton = playerElement.querySelector('.ytp-subtitles-button') as HTMLElement;
    const subtitlesButtonPressed = subtitlesButton.hasAttribute('aria-pressed') as boolean;

    if (subtitlesButtonPressed && !adsOverlay) {
      chrome.storage.sync.get(['bgCC'], ({ bgCC }) => {
        bgCCButton.style.removeProperty('display');
        bgCCButton.setAttribute('aria-checked', bgCC);
      });
    } else {
      bgCCButton.style.setProperty('display', 'none');
    }
  };

  settingsButton.addEventListener('mouseenter', updateSettingsMenu);
};
