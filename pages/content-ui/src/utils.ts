export const getPlayerElement = (isEmbedded: boolean): HTMLElement => {
  const playerSelector = isEmbedded ? '#player' : '#ytd-player';
  return document.querySelector(playerSelector) as HTMLElement;
};

export const getSettingsMenuElements = (
  playerElement: HTMLElement,
): { settingsMenu: HTMLElement; panelMenu: HTMLElement; settingsButton: HTMLElement } => {
  const settingsMenu = playerElement.querySelector('.ytp-settings-menu') as HTMLElement;
  const panel = settingsMenu.querySelector('.ytp-panel') as HTMLElement;
  const panelMenu = panel.querySelector('.ytp-panel-menu') as HTMLElement;
  const settingsButton = playerElement.querySelector('.ytp-settings-button') as HTMLElement;
  return { settingsMenu, panelMenu, settingsButton };
};
