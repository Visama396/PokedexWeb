import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'

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
		<main className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
			{dex.map((pokemon, _) => (
				<div key={_}>
					<h2 className='text-white'>{capitalize(pokemon.name)}</h2>
				</div>
			))}
		</main>
	)
}
