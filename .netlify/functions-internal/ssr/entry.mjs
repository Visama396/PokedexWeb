import * as adapter from '@astrojs/netlify/ssr-function.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_e4439ef4.mjs';
import './chunks/astro_ab4bf765.mjs';
import './chunks/pages/generic_7f9eef86.mjs';
import './chunks/astro-assets-services_dc74f136.mjs';

const _page0  = () => import('./chunks/generic_12ad4597.mjs');
const _page1  = () => import('./chunks/index_46a4f056.mjs');
const _page2  = () => import('./chunks/404_ea62887f.mjs');
const _page3  = () => import('./chunks/_pokemon__7c5ffaf0.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.4.4_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/404.astro", _page2],["src/pages/[pokemon].astro", _page3]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = undefined;

const _exports = adapter.createExports(_manifest, _args);
const _default = _exports['default'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { _default as default, pageMap };
