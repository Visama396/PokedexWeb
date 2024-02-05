export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/_pokemon__bb624667.mjs').then(n => n._);

export { page };
