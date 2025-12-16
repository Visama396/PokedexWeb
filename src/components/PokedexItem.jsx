import { useState, useEffect } from 'react'
import { getIdFromUrl } from '../utils/getIdFromUrl'

export default function PokedexItem({ pokemonName, pokemonUrl }) {
	const [name, setName] = useState(pokemonName)
	const [url, setUrl] = useState(pokemonUrl)
	const [id, setId] = useState(getIdFromUrl(pokemonUrl))
	const [pokemon, setPokemon] = useState(null)
	const [species, setSpecies] = useState(null)

	useEffect(() => {

	}, [])

	return (
		<a href={`/${name.toLowerCase()}`} className='flex flex-col justify-center items-center py-2 transition-all rounded-md w-full h-full text-white hover:scale-105 hover:shadow-2xl pokemon-card'>
			{name}
		</a>
	)
}
