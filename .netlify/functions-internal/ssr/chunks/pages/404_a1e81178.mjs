/* empty css                               */import { e as createAstro, f as createComponent, r as renderTemplate, g as renderHead, h as renderSlot, i as renderComponent, m as maybeRenderHead } from '../astro_ab4bf765.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="twitter:card" content="summary_large_large"><meta name="twitter:site" content="@visama396"><title>${title}</title>${renderHead()}</head><body>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "E:/PokedexWeb/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 couldn't find that" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="max-w-4xl m-auto min-h-screen grid place-content-center"><h1 class="font-black" style="color: white">Couldn't find that!</h1><img src="https://midu.dev/images/this-is-fine-404.gif"></main>` })}`;
}, "E:/PokedexWeb/src/pages/404.astro", void 0);

const $$file = "E:/PokedexWeb/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _404 as _ };
