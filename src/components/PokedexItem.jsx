import { useState, useEffect } from 'react'
import { getDexNumber } from '../utils/getDexNumber'
import { capitalize, backspaceAndCapitalize } from '../utils/capitalize'
import { translate } from '../utils/translate'

export default function PokedexItem({ nationalEntry, pokemonName, pokemonUrl, language = 'es' }) {
	const [name, setName] = useState(pokemonName)
	const [url, setUrl] = useState(pokemonUrl)
	const [id, setId] = useState(0)
	const [pokemon, setPokemon] = useState(null)
	const [species, setSpecies] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res1 = await fetch(url)
				const speciesData = await res1.json()
				setSpecies(speciesData)

				const varietyUrl = speciesData.varieties.find(vari => vari.is_default)?.pokemon.url

				const res2 = await fetch(varietyUrl)
				const pokemonData = await res2.json()
				setPokemon(pokemonData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [language])

	return pokemon && (
		<a
			id={name}
			href={`/${name.toLowerCase()}`}
			className='flex flex-col justify-center items-center py-2 transition-all rounded-md w-full h-full text-white hover:scale-105 hover:shadow-2xl pokemon-card'
			style={{ background: pokemon.types.length == 1 ? `var(--${pokemon.types[0].type.name})` : `linear-gradient(135deg, var(--${pokemon.types[0].type.name}), var(--${pokemon.types[1].type.name}))` }}>
			<p className='text-center text-xl'>#{getDexNumber(nationalEntry)}</p>
			<img className='object-cover p-4' src={pokemon.sprites.other.home.front_default} alt={`sprite ${name}`} />
			<div className=''>
				<h1 className='font-black text-center text-lg md:text-2xl pokemon'>{backspaceAndCapitalize(species.names.find(nam => nam.language.name === language)?.name || name)}</h1>
				<p className='text-center font-bold text-sm'>
					{
						pokemon.types.map((typ, i) => (
							<>
								<span key={i} style={{ color: `var(--light-${typ.type.name})`, textShadow: '0px 0px 6px rgba(255, 255, 255, 0.4)' }}>{translate(typ.type.name, language)}</span>
								{ i < pokemon.types.length - 1 && <span className='text-black font-bold'> · </span> }
							</>
						))
					}
				</p>
			</div>
		</a>
	)
}
