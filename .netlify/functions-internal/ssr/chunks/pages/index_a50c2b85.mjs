/* empty css                               */import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, j as addAttribute, i as renderComponent } from '../astro_ab4bf765.mjs';
import { $ as $$Layout } from './404_a1e81178.mjs';
import { c as capitalize } from './_pokemon__8b5e5f1a.mjs';

const $$Astro$3 = createAstro();
const $$Title = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Title;
  return renderTemplate`${maybeRenderHead()}<h1 class="font-black uppercase text-4xl md:text-5xl lg:text-6xl text-center py-8 text-white" style="text-shadow: 0px 0px 10px rgba(255,255,255,0.7);">Pokédex</h1>`;
}, "E:/PokedexWeb/src/components/Title.astro", void 0);

const $$Astro$2 = createAstro();
const $$PokemonItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PokemonItem;
  const { id, url, title, img } = Astro2.props;
  const data = await fetch(url).then((response) => response.json()).catch((err) => console.error("Pok\xE9mon not found. Cause: Url of data is not working."));
  return renderTemplate`${maybeRenderHead()}<a class="grid justify-center place-content-end transition-all rounded-lg w-full h-full pb-4 gap-2 hover:scale-105 hover:shadow-2xl"${addAttribute(data.types.length == 1 ? `background-color: var(--${data.types[0].type.name})` : `background: linear-gradient(135deg, var(--${data.types[0].type.name}), var(--${data.types[1].type.name}))`, "style")}${addAttribute(`/${id}`, "href")}${addAttribute(title.toLowerCase(), "id")}><img class="object-cover mx-auto"${addAttribute(img, "src")}${addAttribute(id, "alt")}><h1 class="font-black text-center text-2xl text-white pokemon">${title}</h1><p class="text-center" style="font-weight: bold">${data.types.length == 1 ? renderTemplate`<span${addAttribute(`color: var(--light-${data.types[0].type.name}); text-shadow: 0 0 10px rgba(255,255,255,0.5)`, "style")}>${data.types[0].type.name}</span>` : renderTemplate`<span${addAttribute(`color: var(--light-${data.types[0].type.name}); text-shadow: 0 0 8px rgba(255,255,255,0.5)`, "style")}>${data.types[0].type.name}</span><span> · </span><span${addAttribute(`color: var(--light-${data.types[1].type.name}); text-shadow: 0 0 8px rgba(255,255,255,0.5)`, "style")}>${data.types[1].type.name}</span>`}</p></a>`;
}, "E:/PokedexWeb/src/components/PokemonItem.astro", void 0);

const getIdFromUrl = (url) => url.split('/')[6];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$ListOfPokemon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ListOfPokemon;
  const pokedex = await fetch(`https://pokeapi.co/api/v2/pokemon/`).then((response) => response.json());
  return renderTemplate(_a || (_a = __template(["", '<div class="flex gap-3 flex-col justify-center items-center pb-5"><input type="search" id="pokedex-filter" class="outline-none rounded-full px-2 py-1 bg-zinc-600/50 text-white text-center"><div id="filter-types" class="flex gap-2 flex-wrap justify-center items-center"><button type="button" data-type="normal" class="pill">Normal</button><button type="button" data-type="fire" class="pill fire">Fire</button><button type="button" data-type="water" class="pill water">Water</button><button type="button" data-type="electric" class="pill electric">Electric</button><button type="button" data-type="grass" class="pill grass">Grass</button><button type="button" data-type="ice" class="pill ice">Ice</button><button type="button" data-type="fighting" class="pill fighting">Fighting</button><button type="button" data-type="poison" class="pill poison">Poison</button><button type="button" data-type="ground" class="pill ground">Ground</button><button type="button" data-type="flying" class="pill flying">Flying</button><button type="button" data-type="psychic" class="pill psychic">Psychic</button><button type="button" data-type="bug" class="pill bug">Bug</button><button type="button" data-type="rock" class="pill rock">Rock</button><button type="button" data-type="ghost" class="pill ghost">Ghost</button><button type="button" data-type="dragon" class="pill dragon">Dragon</button><button type="button" data-type="dark" class="pill dark">Dark</button><button type="button" data-type="steel" class="pill steel">Steel</button><button type="button" data-type="fairy" class="pill fairy">Fairy</button></div></div><section id="pokedex" class="grid grid-cols-2 px-4 md:grid-cols-3 lg:grid-cols-5 gap-3" style="grid-auto-rows: 1fr"', ">", `</section><script>
let isLoading = false
let pokedex = document.querySelector("#pokedex")
let pokedexFilter = document.querySelector("#pokedex-filter")
let typesFiltered = []
let filterTypes = document.querySelector("#filter-types")

const onFilterValueChange = (event) => {
  let value = event?.target.value.toLowerCase() || ''
  
  for (let pokemon of pokedex.children) {
    if (pokemon.id.includes(value)) {
      pokemon.style.display = 'grid'
    } 
    else pokemon.style.display = 'none'

    if (typesFiltered.length > 0) {
      for (let type of typesFiltered) {
        if (pokemon.style.background?.includes(type) || pokemon.style.backgroundColor.includes(type)) {
          pokemon.style.display = 'none'
        }
      }
    }
  }
}

pokedexFilter.oninput = onFilterValueChange

for (let type of filterTypes.children) {
  type.onclick = (event) => {
    let button = event.target
    if (button.classList.contains('off')) {
      button.classList.remove('off')
      typesFiltered.splice(typesFiltered.indexOf(button.dataset.type), 1)
    }
    else {
      button.classList.add('off')
      typesFiltered.push(button.dataset.type)
    }

    onFilterValueChange()
  }
}

const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

async function addNewPokemon(pokemon) {
  for (poke of pokemon) {
    const data = await fetch(poke.url).then(response => response.json()).catch(err => console.error("Pok\xE9mon not found."))

    let newPokemonElement = document.createElement("a")
    newPokemonElement.classList.add("grid", "justify-center", "place-content-end", "transition-all", "rounded-lg", "w-full", "h-full", "pb-4", "gap-2", "hover:scale-105", "hover:shadow-2xl")
    if (data.types.length == 1)
      newPokemonElement.style.backgroundColor = "var(--"+data.types[0].type.name+")"
    else
      newPokemonElement.style.background = "linear-gradient(135deg, var(--"+data.types[0].type.name+"), var(--"+data.types[1].type.name+"))"

    newPokemonElement.href = "/"+data.name
    newPokemonElement.id = data.name.toLowerCase()

    let pokemonSpriteElement = document.createElement("img")
    pokemonSpriteElement.classList.add("object-cover", "mx-auto")
    pokemonSpriteElement.src = data.sprites.other.home.front_default
    pokemonSpriteElement.alt = data.name
    newPokemonElement.appendChild(pokemonSpriteElement)

    let pokemonNameElement = document.createElement("h1")
    pokemonNameElement.classList.add("front-black", "text-center", "text-2xl", "text-white", "pokemon")
    pokemonNameElement.innerText = capitalize(data.name)
    newPokemonElement.appendChild(pokemonNameElement)

    let pokemonTypesContainer = document.createElement("p")
    pokemonTypesContainer.classList.add("text-center")
    pokemonTypesContainer.style.fontWeight = "bold"

    if (data.types.length == 1)
    {
      const typeOneElement = document.createElement("span")
      typeOneElement.style.color = "var(--light-"+data.types[0].type.name+")"
      typeOneElement.style.textShadow = "0 0 10px rgba(255,255,255,0.5)"
      typeOneElement.innerText = data.types[0].type.name
      pokemonTypesContainer.appendChild(typeOneElement)
    } else {
      const typeOneElement = document.createElement("span")
      typeOneElement.style.color = "var(--light-"+data.types[0].type.name+")"
      typeOneElement.style.textShadow = "0 0 8px rgba(255,255,255,0.5)"
      typeOneElement.innerText = data.types[0].type.name
      pokemonTypesContainer.appendChild(typeOneElement)
      const divisor = document.createElement("span")
      divisor.innerText = " \xB7 "
      pokemonTypesContainer.appendChild(divisor)
      const typeTwoElement = document.createElement("span")
      typeTwoElement.style.color = "var(--light-"+data.types[1].type.name+")"
      typeTwoElement.style.textShadow = "0 0 8px rgba(255,255,255,0.5)"
      typeTwoElement.innerText = data.types[1].type.name
      pokemonTypesContainer.appendChild(typeTwoElement)
    }
    newPokemonElement.appendChild(pokemonTypesContainer)
    
    pokedex.appendChild(newPokemonElement)
  }
}

async function loadMorePokemon(url) {
  const pokemon = await fetch(url).then(response => response.json())
  pokedex.dataset.next = pokemon.next
  await addNewPokemon(pokemon.results).then(() => isLoading = !isLoading)
}

// Listen to the event of scrolling to load more Pok\xE9mon reaching the end of the site
window.onscroll = async (event) => {
  let scrollY = window.scrollY
  let innerHeight = window.innerHeight
  let offsetHeight = document.body.offsetHeight
  
  if (scrollY + innerHeight > offsetHeight - 100) {
    if (!isLoading) {
      isLoading = !isLoading
      await loadMorePokemon(pokedex.dataset.next)
    }
  }
}
<\/script>`])), maybeRenderHead(), addAttribute(pokedex.next, "data-next"), pokedex.results.map(({ name, url }) => {
    return renderTemplate`${renderComponent($$result, "PokemonItem", $$PokemonItem, { "id": name, "url": url, "title": capitalize(name), "img": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getIdFromUrl(url)}.png` })}`;
  }));
}, "E:/PokedexWeb/src/components/ListOfPokemon.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pok\xE9dex" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="m-auto max-w-7xl">${renderComponent($$result2, "Title", $$Title, {})}${renderComponent($$result2, "ListOfPokemon", $$ListOfPokemon, {})}</main>` })}`;
}, "E:/PokedexWeb/src/pages/index.astro", void 0);

const $$file = "E:/PokedexWeb/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
