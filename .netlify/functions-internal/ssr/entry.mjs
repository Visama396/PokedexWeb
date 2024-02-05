import * as adapter from '@astrojs/netlify/ssr-function.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_5bbca3cc.mjs';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'clsx';
import './chunks/astro_78db06c0.mjs';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/generic_d5e1b206.mjs');
const _page1  = () => import('./chunks/index_eab7cb25.mjs');
const _page2  = () => import('./chunks/404_e9acbeb4.mjs');
const _page3  = () => import('./chunks/_pokemon__d506f869.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.4.4_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/404.astro", _page2],["src/pages/[pokemon].astro", _page3]]);
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
