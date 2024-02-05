/* empty css                               */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, j as addAttribute, i as renderComponent } from '../astro_ab4bf765.mjs';
import { $ as $$Layout } from './404_a1e81178.mjs';

const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

const getDexNumber = (_) => (_ < 10) ? '000' + _ : (_ < 100) ? '00' + _ : (_ < 1000) ? '0' + _ : _;

const getGenus = (genera, language) => genera.filter(genus => genus.language.name === language)[0];

const calculateHP = (base, iv, ev, level) => Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10;

const calculateStat = (base, iv, ev, level, nature) => Math.floor(Math.floor(Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5) * nature);

const $$Astro$5 = createAstro();
const $$PokemonAbilities = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PokemonAbilities;
  const { abilities } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section>${abilities.map(({ ability, is_hidden }) => {
    return renderTemplate`<p>${capitalize(ability.name)}${is_hidden ? renderTemplate`<i class="ml-1 additional-info">(hidden ability)</i>` : " "}</p>`;
  })}</section>`;
}, "E:/PokedexWeb/src/components/PokemonAbilities.astro", void 0);

const $$Astro$4 = createAstro();
const $$PokemonEntryNumbers = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PokemonEntryNumbers;
  const { entries } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section>${entries.map(({ entry_number, pokedex }) => {
    if (pokedex.name != "national")
      return renderTemplate`<p>${getDexNumber(entry_number)}<i class="ml-1 additional-info">(${capitalize(pokedex.name).replaceAll("-", " ")})</i></p>`;
  })}</section>`;
}, "E:/PokedexWeb/src/components/PokemonEntryNumbers.astro", void 0);

const $$Astro$3 = createAstro();
const $$PokemonYield = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PokemonYield;
  const { stats } = Astro2.props;
  let yield_stat = stats.filter((stat) => stat.effort > 0)[0];
  return renderTemplate`${maybeRenderHead()}<p>${yield_stat.effort}<span class="ml-1">${capitalize(yield_stat.stat.name.replace("special-attack", "Sp. Atk").replace("special-defense", "Sp. Def").replace("-", " "))}</span></p>`;
}, "E:/PokedexWeb/src/components/PokemonYield.astro", void 0);

const $$Astro$2 = createAstro();
const $$PokemonTypeEffectiveness = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PokemonTypeEffectiveness;
  const { pokemon, type1, type2 } = Astro2.props;
  let get_damage_relations_type1, get_damage_relations_type2;
  let types = [
    {
      name: "normal",
      value: 1
    },
    {
      name: "fire",
      value: 1
    },
    {
      name: "water",
      value: 1
    },
    {
      name: "electric",
      value: 1
    },
    {
      name: "plant",
      value: 1
    },
    {
      name: "ice",
      value: 1
    },
    {
      name: "fighting",
      value: 1
    },
    {
      name: "poison",
      value: 1
    },
    {
      name: "ground",
      value: 1
    },
    {
      name: "flying",
      value: 1
    },
    {
      name: "psychic",
      value: 1
    },
    {
      name: "bug",
      value: 1
    },
    {
      name: "rock",
      value: 1
    },
    {
      name: "ghost",
      value: 1
    },
    {
      name: "dragon",
      value: 1
    },
    {
      name: "dark",
      value: 1
    },
    {
      name: "steel",
      value: 1
    },
    {
      name: "fairy",
      value: 1
    }
  ];
  get_damage_relations_type1 = await fetch(`https://pokeapi.co/api/v2/type/${type1}`).then((response) => response.json());
  for (const type of get_damage_relations_type1.damage_relations.double_damage_from) {
    for (const t of types) {
      if (type.name == t.name)
        t.value *= 2;
    }
  }
  for (const type of get_damage_relations_type1.damage_relations.half_damage_from) {
    for (const t of types) {
      if (type.name == t.name)
        t.value /= 2;
    }
  }
  for (const type of get_damage_relations_type1.damage_relations.no_damage_from) {
    for (const t of types) {
      if (type.name == t.name)
        t.value = 0;
    }
  }
  if (type2) {
    get_damage_relations_type2 = await fetch(`https://pokeapi.co/api/v2/type/${type2}`).then((response) => response.json());
    for (const type of get_damage_relations_type2.damage_relations.double_damage_from) {
      for (const t of types) {
        if (type.name == t.name)
          t.value *= 2;
      }
    }
    for (const type of get_damage_relations_type2.damage_relations.half_damage_from) {
      for (const t of types) {
        if (type.name == t.name)
          t.value /= 2;
      }
    }
    for (const type of get_damage_relations_type2.damage_relations.no_damage_from) {
      for (const t of types) {
        if (type.name == t.name)
          t.value = 0;
      }
    }
  }
  return renderTemplate`${maybeRenderHead()}<section><h2 class="text-4xl mb-2 font-black">Type defenses</h2><p>The effectiveness of each type on ${capitalize(pokemon)}</p><section class="grid xl:grid-cols-9 grid-cols-6 xl:gap-2 gap-4"><div class="type-effective"><picture><img src="/normal.svg"></picture><p${addAttribute(`font-black text-center ${types[0].value < 1 ? "text-[red]" : types[0].value > 1 ? "text-[green]" : ""}`, "class")}>${types[0].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[0].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[0].value > 1 ? renderTemplate`<span>${types[0].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/fire.svg"></picture><p${addAttribute(`font-black text-center ${types[1].value < 1 ? "text-[red]" : types[1].value > 1 ? "text-[green]" : ""}`, "class")}>${types[1].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[1].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[1].value > 1 ? renderTemplate`<span>${types[1].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/water.svg"></picture><p${addAttribute(`font-black text-center ${types[2].value < 1 ? "text-[red]" : types[2].value > 1 ? "text-[green]" : ""}`, "class")}>${types[2].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[2].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[2].value > 1 ? renderTemplate`<span>${types[2].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/electric.svg"></picture><p${addAttribute(`font-black text-center ${types[3].value < 1 ? "text-[red]" : types[3].value > 1 ? "text-[green]" : ""}`, "class")}>${types[3].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[3].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[3].value > 1 ? renderTemplate`<span>${types[3].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/grass.svg"></picture><p${addAttribute(`font-black text-center ${types[4].value < 1 ? "text-[red]" : types[4].value > 1 ? "text-[green]" : ""}`, "class")}>${types[4].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[4].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[4].value > 1 ? renderTemplate`<span>${types[4].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/ice.svg"></picture><p${addAttribute(`font-black text-center ${types[5].value < 1 ? "text-[red]" : types[5].value > 1 ? "text-[green]" : ""}`, "class")}>${types[5].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[5].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[5].value > 1 ? renderTemplate`<span>${types[5].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/fighting.svg"></picture><p${addAttribute(`font-black text-center ${types[6].value < 1 ? "text-[red]" : types[6].value > 1 ? "text-[green]" : ""}`, "class")}>${types[6].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[6].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[6].value > 1 ? renderTemplate`<span>${types[6].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/poison.svg"></picture><p${addAttribute(`font-black text-center ${types[7].value < 1 ? "text-[red]" : types[7].value > 1 ? "text-[green]" : ""}`, "class")}>${types[7].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[7].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[7].value > 1 ? renderTemplate`<span>${types[7].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/ground.svg"></picture><p${addAttribute(`font-black text-center ${types[8].value < 1 ? "text-[red]" : types[8].value > 1 ? "text-[green]" : ""}`, "class")}>${types[8].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[8].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[8].value > 1 ? renderTemplate`<span>${types[8].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/flying.svg"></picture><p${addAttribute(`font-black text-center ${types[9].value < 1 ? "text-[red]" : types[9].value > 1 ? "text-[green]" : ""}`, "class")}>${types[9].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[9].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[9].value > 1 ? renderTemplate`<span>${types[9].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/psychic.svg"></picture><p${addAttribute(`font-black text-center ${types[10].value < 1 ? "text-[red]" : types[10].value > 1 ? "text-[green]" : ""}`, "class")}>${types[10].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[10].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[10].value > 1 ? renderTemplate`<span>${types[10].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/bug.svg"></picture><p${addAttribute(`font-black text-center ${types[11].value < 1 ? "text-[red]" : types[11].value > 1 ? "text-[green]" : ""}`, "class")}>${types[11].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[11].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[11].value > 1 ? renderTemplate`<span>${types[11].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/rock.svg"></picture><p${addAttribute(`font-black text-center ${types[12].value < 1 ? "text-[red]" : types[12].value > 1 ? "text-[green]" : ""}`, "class")}>${types[12].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[12].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[12].value > 1 ? renderTemplate`<span>${types[12].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/ghost.svg"></picture><p${addAttribute(`font-black text-center ${types[13].value < 1 ? "text-[red]" : types[13].value > 1 ? "text-[green]" : ""}`, "class")}>${types[13].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[13].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[13].value > 1 ? renderTemplate`<span>${types[13].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/dragon.svg"></picture><p${addAttribute(`font-black text-center ${types[14].value < 1 ? "text-[red]" : types[14].value > 1 ? "text-[green]" : ""}`, "class")}>${types[14].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[14].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[14].value > 1 ? renderTemplate`<span>${types[14].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/dark.svg"></picture><p${addAttribute(`font-black text-center ${types[15].value < 1 ? "text-[red]" : types[15].value > 1 ? "text-[green]" : ""}`, "class")}>${types[15].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[15].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[15].value > 1 ? renderTemplate`<span>${types[15].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/steel.svg"></picture><p${addAttribute(`font-black text-center ${types[16].value < 1 ? "text-[red]" : types[16].value > 1 ? "text-[green]" : ""}`, "class")}>${types[16].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[16].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[16].value > 1 ? renderTemplate`<span>${types[16].value}</span>` : renderTemplate`<span>1</span>`}</p></div><div class="type-effective"><picture><img src="/fairy.svg"></picture><p${addAttribute(`font-black text-center ${types[17].value < 1 ? "text-[red]" : types[17].value > 1 ? "text-[green]" : ""}`, "class")}>${types[17].value == 0.25 ? renderTemplate`<span>&frac14;</span>` : types[17].value == 0.5 ? renderTemplate`<span>&frac12;</span>` : types[17].value > 1 ? renderTemplate`<span>${types[17].value}</span>` : renderTemplate`<span>1</span>`}</p></div></section></section>`;
}, "E:/PokedexWeb/src/components/PokemonTypeEffectiveness.astro", void 0);

const $$Astro$1 = createAstro();
const $$PokemonEvolutionChart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PokemonEvolutionChart;
  const { evolutionChainUrl } = Astro2.props;
  const evolutionChain = await fetch(evolutionChainUrl).then((response) => response.json()).catch((err) => console.error("Pokemon does not have evolution chain", err));
  console.log(evolutionChain.chain.evolves_to[0].evolution_details);
  return renderTemplate`${maybeRenderHead()}<section><h2 class="text-4xl mb-2 font-black">Evolution chart</h2><div></div></section>`;
}, "E:/PokedexWeb/src/components/PokemonEvolutionChart.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$pokemon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$pokemon;
  const { pokemon } = Astro2.params;
  const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) => response.json()).catch((err) => console.error("Pok\xE9mon not found. Cause: Name incorrect.", err));
  if (!pokeData)
    return Astro2.redirect("/404");
  const pokeSpecies = await fetch(pokeData.species.url).then((response) => response.json());
  return renderTemplate(_a || (_a = __template(["", '<script>\nlet statBars = document.querySelectorAll(".stat-bar")\nfor (statBar of statBars) {\n  statBar.style.width = `${Math.floor(statBar.dataset.stat * 0.4)}%`;\n}\n<\/script>'], ["", '<script>\nlet statBars = document.querySelectorAll(".stat-bar")\nfor (statBar of statBars) {\n  statBar.style.width = \\`\\${Math.floor(statBar.dataset.stat * 0.4)}%\\`;\n}\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, { "title": pokemon }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<nav><a href="/" class="inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400">Home</a></nav><section class="grid grid-rows-[max-content_1fr] xl:gap-y-8 px-4 justify-center text-white"><section><h1 class="font-black text-6xl text-center"${addAttribute(`text-shadow: 0px 0px 10px rgba(255,255,255,0.7);`, "style")}>${capitalize(pokemon)}</h1></section><section class="grid pokedata-grid xl:gap-6 gap-4"><picture class="sprite"><img${addAttribute(pokeData.sprites.other.home.front_default, "src")} width="350px"${addAttribute(pokemon, "alt")} class="object-cover"></picture><section class="data"><h2 class="text-4xl mb-2 font-black">Pokédex Data</h2><section class="grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] gap-y-1 gap-x-2"><p class="font-black text-right">National N°</p><p>${getDexNumber(pokeData.id)}</p><p class="flex justify-end items-center font-black">Type</p><p class="flex gap-1">${pokeData.types.length == 1 ? renderTemplate`<span${addAttribute("pill " + pokeData.types[0].type.name, "class")}>${pokeData.types[0].type.name}</span>` : renderTemplate`<span${addAttribute("pill " + pokeData.types[0].type.name, "class")}>${pokeData.types[0].type.name}</span><span${addAttribute("pill " + pokeData.types[1].type.name, "class")}>${pokeData.types[1].type.name}</span>`}</p><p class="font-black text-right">Species</p><p>${getGenus(pokeSpecies.genera, "en") == void 0 ? "Unknown" : getGenus(pokeSpecies.genera, "en").genus}</p><p class="font-black text-right">Height</p><p>${pokeData.height / 10} m</p><p class="font-black text-right">Weight</p><p>${pokeData.weight / 10} kg</p><p class="flex justify-end items-center font-black">Abilities</p>${renderComponent($$result2, "PokemonAbilities", $$PokemonAbilities, { "abilities": pokeData.abilities })}<p class="flex justify-end items-center font-black ">Local N°</p>${renderComponent($$result2, "PokemonEntryNumbers", $$PokemonEntryNumbers, { "entries": pokeSpecies.pokedex_numbers })}</section></section><section class="training"><h2 class="text-4xl mb-2 font-black">Training</h2><section class="grid xl:grid-cols-2 grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] gap-y-1 gap-x-2"><p class="font-black text-right">EV yield</p>${renderComponent($$result2, "PokemonYield", $$PokemonYield, { "stats": pokeData.stats })}<p class="font-black text-right">Catch rate</p><p>${pokeSpecies.capture_rate}</p><p class="font-black text-right">Base friendship</p><p>${pokeSpecies.base_happiness}</p><p class="font-black text-right">Base exp.</p><p>${pokeData.base_experience}</p><p class="font-black text-right">Growth rate</p><p>${capitalize(pokeSpecies.growth_rate.name).replace("-", " ")}</p></section></section><section class="breeding"><h2 class="text-4xl mb-2 font-black">Breeding</h2><section class="grid xl:grid-cols-2 grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] gap-y-1 gap-x-2"><p class="font-black text-right">Egg groups</p><p>${pokeSpecies.egg_groups.length == 1 ? pokeSpecies.egg_groups[0].name == "no-eggs" ? "Undiscovered" : renderTemplate`<span>${capitalize(pokeSpecies.egg_groups[0].name)}</span>` : renderTemplate`<span>${capitalize(pokeSpecies.egg_groups[0].name)}, </span><span>${capitalize(pokeSpecies.egg_groups[1].name)}</span>`}</p><p class="font-black text-right">Gender</p><p><span class="male">${(8 - pokeSpecies.gender_rate) * 12.5}% male</span>, <span class="female">${pokeSpecies.gender_rate * 12.5}% female</span></p><p class="font-black text-right">Egg Cycles</p><p>${pokeSpecies.hatch_counter}<span class="additional-info ml-1">(${(pokeSpecies.hatch_counter - 1) * 257 + 1}-${pokeSpecies.hatch_counter * 257} steps)</span></p></section></section></section><section class="grid md:grid-cols-2 xl:gap-6 gap-4 mt-4"><section class="grid gap-y-2"><h2 class="text-4xl mb-2 font-black">Base stats</h2><section class="grid grid-cols-[max-content_max-content_1fr_max-content_max-content_max-content_max-content] gap-2"><section><p class="text-[gray] text-right">HP</p><p class="text-[gray] text-right">Attack</p><p class="text-[gray] text-right">Defense</p><p class="text-[gray] text-right">Sp. Atk</p><p class="text-[gray] text-right">Sp. Def</p><p class="text-[gray] text-right">Speed</p><p class="text-[gray] text-right">Total</p></section><section><p>${pokeData.stats[0].base_stat}</p><p>${pokeData.stats[1].base_stat}</p><p>${pokeData.stats[2].base_stat}</p><p>${pokeData.stats[3].base_stat}</p><p>${pokeData.stats[4].base_stat}</p><p>${pokeData.stats[5].base_stat}</p><p class="font-black">${pokeData.stats[0].base_stat + pokeData.stats[1].base_stat + pokeData.stats[2].base_stat + pokeData.stats[3].base_stat + pokeData.stats[4].base_stat + pokeData.stats[5].base_stat}</p></section><section class="stat-bar-column"><p><span class="stat-bar"${addAttribute(pokeData.stats[0].base_stat, "data-stat")}${addAttribute(`display:inline-block; height: 5px; background-color: hsl(${Math.floor(pokeData.stats[0].base_stat * 0.4) * 1.25}, 100%, 50%)`, "style")}></span></p><p><span class="stat-bar"${addAttribute(pokeData.stats[1].base_stat, "data-stat")}${addAttribute(`display:inline-block; height: 5px; background-color: hsl(${Math.floor(pokeData.stats[1].base_stat * 0.4) * 1.25}, 100%, 50%)`, "style")}></span></p><p><span class="stat-bar"${addAttribute(pokeData.stats[2].base_stat, "data-stat")}${addAttribute(`display:inline-block; height: 5px; background-color: hsl(${Math.floor(pokeData.stats[2].base_stat * 0.4) * 1.25}, 100%, 50%)`, "style")}></span></p><p><span class="stat-bar"${addAttribute(pokeData.stats[3].base_stat, "data-stat")}${addAttribute(`display:inline-block; height: 5px; background-color: hsl(${Math.floor(pokeData.stats[3].base_stat * 0.4) * 1.25}, 100%, 50%)`, "style")}></span></p><p><span class="stat-bar"${addAttribute(pokeData.stats[4].base_stat, "data-stat")}${addAttribute(`display:inline-block; height: 5px; background-color: hsl(${Math.floor(pokeData.stats[4].base_stat * 0.4) * 1.25}, 100%, 50%)`, "style")}></span></p><p><span class="stat-bar"${addAttribute(pokeData.stats[5].base_stat, "data-stat")}${addAttribute(`display:inline-block; height: 5px; background-color: hsl(${Math.floor(pokeData.stats[5].base_stat * 0.4) * 1.25}, 100%, 50%)`, "style")}></span></p><p></p></section><section><p>${calculateHP(pokeData.stats[0].base_stat, 0, 0, 50)}</p><p>${calculateStat(pokeData.stats[1].base_stat, 0, 0, 50, 0.9)}</p><p>${calculateStat(pokeData.stats[2].base_stat, 0, 0, 50, 0.9)}</p><p>${calculateStat(pokeData.stats[3].base_stat, 0, 0, 50, 0.9)}</p><p>${calculateStat(pokeData.stats[4].base_stat, 0, 0, 50, 0.9)}</p><p>${calculateStat(pokeData.stats[5].base_stat, 0, 0, 50, 0.9)}</p><p class="font-black">Min</p></section><section><p>${calculateHP(pokeData.stats[0].base_stat, 31, 252, 50)}</p><p>${calculateStat(pokeData.stats[1].base_stat, 31, 252, 50, 1.1)}</p><p>${calculateStat(pokeData.stats[2].base_stat, 31, 252, 50, 1.1)}</p><p>${calculateStat(pokeData.stats[3].base_stat, 31, 252, 50, 1.1)}</p><p>${calculateStat(pokeData.stats[4].base_stat, 31, 252, 50, 1.1)}</p><p>${calculateStat(pokeData.stats[5].base_stat, 31, 252, 50, 1.1)}</p><p class="font-black">Max</p></section><section><p>${calculateHP(pokeData.stats[0].base_stat, 0, 0, 100)}</p><p>${calculateStat(pokeData.stats[1].base_stat, 0, 0, 100, 0.9)}</p><p>${calculateStat(pokeData.stats[2].base_stat, 0, 0, 100, 0.9)}</p><p>${calculateStat(pokeData.stats[3].base_stat, 0, 0, 100, 0.9)}</p><p>${calculateStat(pokeData.stats[4].base_stat, 0, 0, 100, 0.9)}</p><p>${calculateStat(pokeData.stats[5].base_stat, 0, 0, 100, 0.9)}</p><p class="font-black">Min</p></section><section><p>${calculateHP(pokeData.stats[0].base_stat, 31, 252, 100)}</p><p>${calculateStat(pokeData.stats[1].base_stat, 31, 252, 100, 1.1)}</p><p>${calculateStat(pokeData.stats[2].base_stat, 31, 252, 100, 1.1)}</p><p>${calculateStat(pokeData.stats[3].base_stat, 31, 252, 100, 1.1)}</p><p>${calculateStat(pokeData.stats[4].base_stat, 31, 252, 100, 1.1)}</p><p>${calculateStat(pokeData.stats[5].base_stat, 31, 252, 100, 1.1)}</p><p class="font-black">Max</p></section></section><footer class="flex flex-col"><i class="additional-info">Minimum calculated values assuming unfavourable nature, 0EVs and 0IVs</i><i class="additional-info">Maximum calculated values assuming favourable nature, 252EVS and 31IVs</i></footer></section>${renderComponent($$result2, "PokemonTypeEffectiveness", $$PokemonTypeEffectiveness, { "pokemon": pokemon, "type1": pokeData.types[0].type.name, "type2": pokeData.types[1]?.type.name })}</section>${renderComponent($$result2, "PokemonEvolutionChart", $$PokemonEvolutionChart, { "evolutionChainUrl": pokeSpecies.evolution_chain.url })}<section><h2 class="text-4xl mb-2 font-black">Moves learned by ${capitalize(pokemon)}</h2></section><section><h2 class="text-4xl mb-2 font-black">Pokédex entries</h2></section><section><h2 class="text-4xl mb-2 font-black">Other languages</h2></section></section>` }));
}, "E:/PokedexWeb/src/pages/[pokemon].astro", void 0);

const $$file = "E:/PokedexWeb/src/pages/[pokemon].astro";
const $$url = "/[pokemon]";

const _pokemon_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$pokemon,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _pokemon_ as _, capitalize as c };
