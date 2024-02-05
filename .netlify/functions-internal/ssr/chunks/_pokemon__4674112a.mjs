export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/_pokemon__8b5e5f1a.mjs').then(n => n._);

export { page };
