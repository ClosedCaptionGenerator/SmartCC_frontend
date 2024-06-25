# SmartCC_frontend

## Table of Contents
- [To Get Started](#to_get_started)
- [For Chrome](#for_chrome)
- [Pages](#pages)
- [Reference](#reference)
- [Made from](#made_from)


## To get started <a name="to_get_started"></a>

1. Clone this repo
2. Install pnpm `npm install -g pnpm`
3. Run `pnpm install`

## For Chrome <a name="for_chrome"></a>

1. Run:
    - Dev: `pnpm dev`
    - Prod: `pnpm build`
2. Open Chrome Browser and go to `chrome://extensions/`
3. Turn `Developer Mode` On (at top right)
4. Click `Load Unpacked` (at top left)
5. Select `dist` directory at the root of the project

## Pages <a name="pages"></a>

- `content` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for chrome extension (`content_scripts` in manifest.json)
- `content-ui` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for render UI in user's page (`content_scripts` in manifest.json)
- `options` - [options](https://developer.chrome.com/docs/extensions/mv3/options/) for chrome extension (`options_page` in manifest.json)
- `popup` - [popup](https://developer.chrome.com/docs/extensions/reference/browserAction/) for chrome extension (`action.default_popup` in manifest.json)


## Reference <a name="reference"></a>

- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [ChromeExtension](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Turborepo](https://turbo.build/repo/docs)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)


## Made from <a name="made_from"></a>

- [chrome-extension-boilterplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)
