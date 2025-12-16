import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import PokedexItem from './PokedexItem'

export default function Pokedex({ lang = 'en', pokedex }) {
	const [dex, setDex] = useState(pokedex)
	const [language, setLanguage] = useState(lang)

	/* useEffect(() => {
		if (pokedex.length === 0) {
			fetch('https://pokeapi.co/api/v2/pokemon/?limit=1025')
				.then(response => response.json())
				.then(data => setDex(data.results))
		}
	}, []) */

	return (
		<main className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-4' style={{ gridAutoRows: '1fr' }}>
			{dex.map((pokemon, _) => (
				<PokedexItem key={_} pokemonName={capitalize(pokemon.name)} pokemonUrl={pokemon.url} />
			))}
		</main>
	)
}
