var url = "https://pokeapi.co/api/v2/pokemon-species/"
var sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" // anadir al final de este string el id del pokemon + .png

var pokedex = []

async function fetchPokedex(string) {
    const res = await fetch(string)

    const dex = await res.json()
    url = dex.next

    return dex
}

async function fetchPokemon(pokemon)
{
    const res = await fetch(pokemon);
    const poke = await res.json();
    return poke
}

document.onreadystatechange = async function() {
    if (this.readyState == "complete") {
        console.log("Complete loading")

        let poke = await fetchPokedex(url)
        
        let dex = document.querySelector("#pokedex")

        for (let poki of poke.results)
        {
            let pokeData = await fetchPokemon(poki.url)
            console.log(pokeData)
            let newElem = document.createElement("img")
            newElem.alt = pokeData.name
            newElem.src = sprite + `${pokeData.id}.png`;

            dex.appendChild(newElem)
        }
    }
}