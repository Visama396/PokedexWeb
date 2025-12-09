import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { translateGenToNum } from '../utils/translateGenToNum'
import { translate } from '../utils/translate'

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

	const COLORS = {
		green: '#4caf50',
		red: '#f44336',
		yellowSoft: '#e1c03b', // amarillo menos intenso
		neutral: '#4caf50' // sin color cuando ninguno tiene valor
	}

	function compareTypes(guessTypes = [], targetTypes = [], index) {
		const guess = guessTypes[index]
		const target = targetTypes[index]

		// Caso: ninguno tiene valor en esta posición -> neutral (p.ej. no pintar)
		if (guess === undefined && target === undefined) {
			return COLORS.neutral
		}

		// Si guess está vacío/undefined pero target tiene otro sitio con guess → amarillo
		// (pero aquí guess es undefined, así que no aplica). En cambio si guess existe y target undefined:
		if (guess === undefined && target !== undefined) {
			// el usuario no introdujo tipo en esta posición -> rojo (no coincide)
			return COLORS.red
		}

		if (target === undefined && guess !== undefined) {
			// El objetivo no tiene tipo en esta posición pero el usuario sí: si ese tipo aparece en otra posición -> amarillo
			return (targetTypes.includes(guess) ? COLORS.yellowSoft : COLORS.red)
		}

		// Ambos definidos: coincidencia exacta -> verde
		if (guess === target) return COLORS.green

		// Si el tipo del guess aparece en otra posición del target -> amarillo
		if (targetTypes.includes(guess)) return COLORS.yellowSoft

		// No coincide en ninguna parte -> rojo
		return COLORS.red
	}

	// Función para habilidades (puede haber más de 2/3 habilidades; mismo comportamiento)
	function compareAbilities(guessAbilities = [], targetAbilities = [], index) {
		const guess = guessAbilities[index]
		const target = targetAbilities[index]

		if (guess === undefined && target === undefined) {
			return COLORS.neutral
		}

		if (guess === undefined && target !== undefined) {
			return COLORS.red
		}

		if (target === undefined && guess !== undefined) {
			return (targetAbilities.includes(guess) ? COLORS.yellowSoft : COLORS.red)
		}

		if (guess === target) return COLORS.green
		if (targetAbilities.includes(guess)) return COLORS.yellowSoft
		return COLORS.red
	}

	if (loading) return <div>{translate('loading', language)}</div>

	return (
		<tr>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareTypes(pokeTryData.types, pokemon.types, 0) }}>{pokeTryData.types[0] ?? translate('none', language)}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareTypes(pokeTryData.types, pokemon.types, 1) }}>{pokeTryData.types[1] ?? translate('none', language)}</td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.height - pokemon.height === 0 ? COLORS.green : COLORS.red }}><p className='font-bold'>{pokeTryData.height / 10} m</p><p>{pokemon.height === pokeTryData.height ? '' : pokemon.height > pokeTryData.height ? translate('up', language) : translate('down', language)}</p></td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.weight - pokemon.weight === 0 ? COLORS.green : COLORS.red }}><p className='font-bold'>{pokeTryData.weight / 10} kg</p><p>{pokemon.weight === pokeTryData.weight ? '' : pokemon.weight > pokeTryData.weight ? translate('up', language) : translate('down', language)}</p></td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 0) }}>{pokeTryData.abilities[0]}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 1) }}>{pokeTryData.abilities[1] ?? translate('none', language)}</td>
			<td className='size-[8rem] rounded-md font-bold' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 2) }}>{pokeTryData.abilities[2] ?? translate('none', language)}</td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.baseStats - pokemon.baseStats === 0 ? COLORS.green : COLORS.red }}><p className='font-bold'>{pokeTryData.baseStats}</p><p>{pokemon.baseStats === pokeTryData.baseStats ? '' : pokemon.baseStats > pokeTryData.baseStats ? translate('up', language) : translate('down', language)}</p></td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: translateGenToNum(pokeTryData.generation) === translateGenToNum(pokemon.generation) ? COLORS.green : COLORS.red }}><p className='font-bold'>{pokeTryData.generation}</p><p>{translateGenToNum(pokeTryData.generation) === translateGenToNum(pokemon.generation) ? '' : translateGenToNum(pokeTryData.generation) < translateGenToNum(pokemon.generation) ? translate('up', language) : translate('down', language)}</p></td>
			<td className='size-[8rem] rounded-md cursor-pointer'><img src={pokeTryData.sprite} title={pokeTryData.name} alt={pokeTryData.name} /></td>
		</tr>
	)
}
