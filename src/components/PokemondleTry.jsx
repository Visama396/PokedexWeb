import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { translateGenToNum } from '../utils/translateGenToNum'

/**
 *
 * @param {*} pokemon The pokemon of the day
 * @param {*} pokeTry The try the user has made
 */
export default function PokemondleTry({ pokemon, pokeTry, language }) {
	const [pokeTryData, setPokeTryData] = useState({ name: pokeTry.name, id: pokeTry.id, types: [], abilities: [], height: 0, weight: 0, sprite: '' })
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const newPokeData = {
			name: pokeTry.name,
			id: pokeTry.id,
			types: [],
			abilities: [],
			height: 0,
			weight: 0,
			sprite: ''
		}

		async function loadPokemonData() {
			try {
				// --- Requests al species y pokemon EN PARALELO ---
				const [speciesRes, pokemonRes] = await Promise.all([
					fetch(`https://pokeapi.co/api/v2/pokemon-species/${newPokeData.id}`),
					fetch(`https://pokeapi.co/api/v2/pokemon/${newPokeData.id}`)
				])

				const species = await speciesRes.json()
				const pokemon = await pokemonRes.json()

				// --- Procesar species ---
				let gen = species.generation.name.replace('generation-', '')
				gen = capitalize(gen, false)

				const localizedName = species.names.find(n => n.language.name === language)?.name || species.name

				// --- Procesar pokemon ---
				let newPokemon = {
					...newPokeData,
					id: pokemon.id,
					name: capitalize(localizedName),
					generation: gen,
					height: pokemon.height,
					weight: pokemon.weight,
					baseStats: pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0),
					sprite: pokemon.sprites.other.home.front_default,
					types: pokemon.types.map(t => t.type.name),
					abilities: pokemon.abilities.map(a => a.ability.name)
				}

				// --- Localizar nombres de abilities y types en paralelo ---
				const [localizedAbilities, localizedTypes] = await Promise.all([
					Promise.all(
						newPokemon.abilities.map(async ability => {
							const res = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
							const data = await res.json()
							return data.names.find(n => n.language.name === language)?.name || data.name
						})
					),
					Promise.all(
						newPokemon.types.map(async type => {
							const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
							const data = await res.json()
							return data.names.find(n => n.language.name === language)?.name || data.name
						})
					)
				])

				// Crear objeto final inmutable
				newPokemon = {
					...newPokemon,
					abilities: localizedAbilities.map(a => capitalize(a)),
					types: localizedTypes.map(t => capitalize(t))
				}

				// --- Actualizar estado ---
				setPokeTryData(newPokemon)
			} catch (err) {
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		loadPokemonData()
	}, [])

	function compareAttribute(guessAttr, targetAttr) {
		if (!guessAttr || !targetAttr) return 'red'
		return guessAttr === targetAttr ? 'green' : 'red'
	}

	function compareTypes(guessTypes, targetTypes, index) {
		const guess = guessTypes[index]
		const target = targetTypes[index]

		// Si alguno es undefined → rojo
		if (!guess || !target) {
			// Pero si existe en otra posición → amarillo
			if (targetTypes.includes(guess)) return '#f5cd1d'
			return 'red'
		}

		// Coincidencia exacta
		if (guess === target) return 'green'

		// Existe en otra posición -> amarillo
		if (targetTypes.includes(guess)) return '#f5cd1d'

		// No coincide -> rojo
		return 'red'
	}

	function compareAbilities(guessAbilities, targetAbilities, index) {
		const guess = guessAbilities[index]
		const target = targetAbilities[index]

		if (!guess || !target) {
			if (targetAbilities.includes(guess)) return '#f5cd1d'
			return 'red'
		}

		if (guess === target) return 'green'

		if (targetAbilities.includes(guess)) return '#f5cd1d'

		return 'red'
	}

	if (loading) return <div>Loading...</div>

	return (
		<tr>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareTypes(pokeTryData.types, pokemon.types, 0) }}>{pokeTryData.types[0] ?? 'None'}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareTypes(pokeTryData.types, pokemon.types, 1) }}>{pokeTryData.types[1] ?? 'None'}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: pokeTryData.height - pokemon.height === 0 ? 'green' : 'red' }}><p>{pokeTryData.height / 10} m</p><p>{pokemon.height > pokeTryData.height ? 'Up' : 'Down'}</p></td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: pokeTryData.weight - pokemon.weight === 0 ? 'green' : 'red' }}><p>{pokeTryData.weight / 10} kg</p><p>{pokemon.weight > pokeTryData.weight ? 'Up' : 'Down'}</p></td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 0) }}>{pokeTryData.abilities[0]}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 1) }}>{pokeTryData.abilities[1] ?? 'None'}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 2) }}>{pokeTryData.abilities[2] ?? 'None'}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: pokeTryData.baseStats - pokemon.baseStats === 0 ? 'green' : 'red' }}><p>{pokeTryData.baseStats}</p><p>{pokemon.baseStats > pokeTryData.baseStats ? 'Up' : 'Down'}</p></td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: translateGenToNum(pokeTryData.generation) === translateGenToNum(pokemon.generation) ? 'green' : 'red' }}><p>{pokeTryData.generation}</p><p>{translateGenToNum(pokeTryData.generation) < translateGenToNum(pokemon.generation) ? 'Up' : 'Down'}</p></td>
			<td className='size-[8rem] rounded-md'><img src={pokeTryData.sprite} alt={pokeTryData.name} /></td>
		</tr>
	)
}
