import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { translateGenToNum } from '../utils/translateGenToNum'
import { translate } from '../utils/translate'
import { ArrowUp, ArrowDown } from 'lucide-react'

/**
 *
 * @param {*} pokemon The pokemon of the day
 * @param {*} pokeTry The try the user has made
 */
export default function PokemondleTry({ pokemon, pokeTry, language }) {
	const [pokeTryData, setPokeTryData] = useState({
		name: pokeTry.pokemon.name,
		id: pokeTry.entry_number,
		types: pokeTry.pokemon.types.map(type => type.type.name),
		abilities: pokeTry.pokemon.abilities.map(ability => ability.ability.name),
		height: pokeTry.pokemon.height,
		weight: pokeTry.pokemon.weight,
		sprite: pokeTry.pokemon.sprites.other.home.front_default,
		baseStats: pokeTry.pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0),
		generation: pokeTry.species.generation.name.replace('generation-', '').toUpperCase()
	})
	const [loading, setLoading] = useState(true)

	const COLORS = {
		green: '#4caf50',
		red: '#f44336',
		yellowSoft: '#e1c03b',
		neutral: '#4caf50'
	}

	function compareTypes(guessTypes = [], targetTypes = [], index) {
		const guess = guessTypes[index]
		const target = targetTypes[index]

		if (guess === undefined && target === undefined) {
			return COLORS.neutral
		}

		if (guess === undefined && target !== undefined) {
			return COLORS.red
		}

		if (target === undefined && guess !== undefined) {
			return (targetTypes.includes(guess) ? COLORS.yellowSoft : COLORS.red)
		}

		if (guess === target) return COLORS.green

		if (targetTypes.includes(guess)) return COLORS.yellowSoft

		return COLORS.red
	}

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

	useEffect(() => {
	  /*const localizeTry = async () => {
			setLoading(true)

			try {
			  const localizedAbilities = await Promise.all(
					pokeTryData.abilities.map(async (abilityName) => {
					  const res = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`)
					  const data = await res.json()
					  const localized = data.names.find(n => n.language.name === language)?.name || abilityName
						return localized
					})
				)

				setPokeTryData({ ...pokeTryData, abilities: localizedAbilities })
			} catch (err) {
				console.error(err)
			} finally {
			  setLoading(false)
			}
		}

		localizeTry()*/
		setLoading(false)
		/*console.log('PokemondleTry Component PokeTry: ', pokeTry)
		console.log('PokemondleTry Component Pokemon: ', pokemon)*/
	}, [language])

  if (loading) return <tr><td className='col-span-10'>{translate('loading', language)}</td></tr>
	return (
		<tr className='wrap-break-word'>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: compareTypes(pokeTryData.types, pokemon.types, 0) }}><p>{capitalize(translate(pokeTryData.types[0], language))}</p></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: compareTypes(pokeTryData.types, pokemon.types, 1) }}><p>{pokeTryData.types[1] ? capitalize(translate(pokeTryData.types[1], language)) : '-'}</p></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: pokeTryData.height - pokemon.height === 0 ? COLORS.green : COLORS.red }}><p>{pokeTryData.height / 10} m</p><div className='flex justify-center'>{pokemon.height === pokeTryData.height ? '' : pokemon.height > pokeTryData.height ? <ArrowUp className='size-3 xl:size-6' /> : <ArrowDown className='size-3 xl:size-6' />}</div></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: pokeTryData.weight - pokemon.weight === 0 ? COLORS.green : COLORS.red }}><p>{pokeTryData.weight / 10} kg</p><div className='flex justify-center'>{pokemon.weight === pokeTryData.weight ? '' : pokemon.weight > pokeTryData.weight ? <ArrowUp className='size-3 xl:size-6' /> : <ArrowDown className='size-3 xl:size-6' />}</div></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 0) }}><p>{capitalize(pokeTryData.abilities[0])}</p></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 1) }}><p>{pokeTryData.abilities[1] ? capitalize(pokeTryData.abilities[1]) : '-'}</p></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: compareAbilities(pokeTryData.abilities, pokemon.abilities, 2) }}><p>{pokeTryData.abilities[2] ? capitalize(pokeTryData.abilities[2]) : '-'}</p></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: pokeTryData.baseStats - pokemon.baseStats === 0 ? COLORS.green : COLORS.red }}><p>{pokeTryData.baseStats}</p><div className='flex justify-center'>{pokemon.baseStats === pokeTryData.baseStats ? '' : pokemon.baseStats > pokeTryData.baseStats ? <ArrowUp className='size-3 xl:size-6' /> : <ArrowDown className='size-3 xl:size-6' />}</div></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md' style={{ backgroundColor: translateGenToNum(pokeTryData.generation) === translateGenToNum(pokemon.generation) ? COLORS.green : COLORS.red }}><p>{pokeTryData.generation}</p><div className='flex justify-center'>{translateGenToNum(pokeTryData.generation) === translateGenToNum(pokemon.generation) ? '' : translateGenToNum(pokeTryData.generation) < translateGenToNum(pokemon.generation) ? <ArrowUp className='size-3 xl:size-6' /> : <ArrowDown className='size-3 xl:size-6' />}</div></td>
			<td className='size-16 xl:size-32 rounded-sm xl:rounded-md'><a href={'/' + pokeTryData.name.toLowerCase()} target='_blank' rel='noopener noreferrer'><img src={pokeTryData.sprite} title={pokeTryData.name} alt={pokeTryData.name} /></a></td>
		</tr>
	)
}
