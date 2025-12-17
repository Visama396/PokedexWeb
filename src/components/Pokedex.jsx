import { useState, useEffect } from 'react'

import PokedexItem from './PokedexItem'
import PokedexInput from './PokedexInput'

import { translate } from '../utils/translate'
import { getPokemon, setPokemon } from '../utils/pokemonDB'

export default function Pokedex({ language = 'es', pokedex }) {
	const [dex, setDex] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchAllPokemon = async () => {
			setLoading(true)

			const results = await Promise.all(
				pokedex.map(async (entry) => {
					const speciesUrl = entry.pokemon_species.url

					const cached = await getPokemon(speciesUrl)
					if (cached) {
						return {
							entry_number: entry.entry_number,
							pokemon: cached.pokemon,
							species: cached.species
						}
					}
					const species = await fetch(speciesUrl).then(r => r.json())
        	const varietyUrl = species.varieties.find(v => v.is_default)?.pokemon.url

         	const pokemon = await fetch(varietyUrl).then(r => r.json())
          await setPokemon(speciesUrl, { pokemon, species })

          return {
          	entry_number: entry.entry_number,
           	pokemon,
            species
          }
				})
			)

			setDex(results)
			setLoading(false)
		}

		fetchAllPokemon()
	}, [pokedex])

	if (loading) return <p className='text-white'>{translate('loadingDex', language)}</p>

	return (
		<div className='flex flex-col items-center'>
			<PokedexInput language={language} pokedex={dex} />
			<main className='grid w-full grid-cols-2 xl:max-w-[70%] md:grid-cols-3 lg:grid-cols-5 gap-3 px-4' style={{ gridAutoRows: '1fr' }}>
				{dex.map(({ entry_number, pokemon, species }) => (
					<PokedexItem key={entry_number} nationalEntry={entry_number} pokemon={pokemon} species={species} language={language} />
				))}
			</main>
		</div>
	)
}
