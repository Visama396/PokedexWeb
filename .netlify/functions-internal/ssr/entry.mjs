import { renderers } from './renderers.mjs';
import { manifest } from './manifest_tZDqfiW7.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_4io-A3O1.mjs');
const _page1 = () => import('./chunks/index_DFv8WE-M.mjs');
const _page2 = () => import('./chunks/404_WLPk3ofr.mjs');
const _page3 = () => import('./chunks/_pokemon__J1MXUDhG.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/index.astro", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/[pokemon].astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = undefined;
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
