import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import PokedexItem from './PokedexItem'
import PokedexInput from './PokedexInput'

export default function Pokedex({ language = 'es', pokedex }) {
	const [dex, setDex] = useState(pokedex)

	return (
		<div className='flex flex-col items-center'>
			<PokedexInput language={language} />
			<main className='grid w-full grid-cols-2 xl:max-w-[70%] md:grid-cols-3 lg:grid-cols-5 gap-3 px-4' style={{ gridAutoRows: '1fr' }}>
				{dex.map((entry) => (
					<PokedexItem key={entry.entry_number} nationalEntry={entry.entry_number} pokemonName={capitalize(entry.pokemon_species.name)} pokemonUrl={entry.pokemon_species.url} language={language} />
				))}
			</main>
		</div>
	)
}
