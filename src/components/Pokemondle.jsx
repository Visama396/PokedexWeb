import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { getDailyPokemon, getRandomPokemon } from '../utils/getPokemonId'
import PokedleInput from './PokedleInput'
import PokemondleTry from './PokemondleTry'
import { translate } from '../utils/translate'

export default function Pokemondle({ daily, language = 'en' }) {
	const [pokemon, setPokemon] = useState({ generation: '', height: 0, weight: 0, baseStats: 0, sprite: '', types: [], abilities: [], name: '', id: 0 })
	const [allPokemon, setAllPokemon] = useState([])
	const [pokeDate, setPokeDate] = useState(() => {
		if (daily) {
			try {
				const savedDate = localStorage.getItem('pokeDate')
				return savedDate || new Date().toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
			} catch {
				return new Date().toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
			}
		}
	})
	const [pokeTries, setPokeTries] = useState(() => {
		if (daily) {
			try {
				const stored = localStorage.getItem('pokeTries')
				return stored ? JSON.parse(stored) : []
			} catch {
				return []
			}
		} else return []
	})
	const [loading, setLoading] = useState(true)
	const [lang, setLang] = useState(language)

	useEffect(() => {
		const pokemonOfTheDay = {
			generation: '',
			height: 0,
			weight: 0,
			baseStats: 0,
			sprite: '',
			types: [],
			abilities: [],
			name: '',
			id: daily ? getDailyPokemon() : getRandomPokemon()
		}

		if (daily) {
			const todayDate = new Date().toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
			const savedDate = localStorage.getItem('pokeDate')
			if (!savedDate || savedDate !== todayDate) {
				localStorage.removeItem('pokeTries')
				setPokeTries([])

				localStorage.setItem('pokeDate', todayDate)
				setPokeDate(todayDate)
			}
		}

		fetch('https://pokeapi.co/api/v2/pokemon/?limit=1025').then(response => response.json())
			.then(data => {
				setAllPokemon(data.results)
			})

		async function loadPokemonData() {
			try {
				// --- Requests al species y pokemon EN PARALELO ---
				const [speciesRes, pokemonRes] = await Promise.all([
					fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonOfTheDay.id}`),
					fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonOfTheDay.id}`)
				])

				const species = await speciesRes.json()
				const pokemon = await pokemonRes.json()

				// --- Procesar species ---
				let gen = species.generation.name.replace('generation-', '')
				gen = capitalize(gen, false)

				const localizedName = species.names.find(n => n.language.name === lang)?.name || species.name

				// --- Procesar pokemon ---
				let newPokemon = {
					...pokemonOfTheDay,
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
							return data.names.find(n => n.language.name === lang)?.name || data.name
						})
					),
					Promise.all(
						newPokemon.types.map(async type => {
							const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
							const data = await res.json()
							return data.names.find(n => n.language.name === lang)?.name || data.name
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
				setPokemon(newPokemon)
			} catch (err) {
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		loadPokemonData()
	}, [])

	useEffect(() => {
		if (daily) {
			localStorage.setItem('pokeTries', JSON.stringify(pokeTries))
		}
	}, [pokeTries])

	const handlePokemonClick = (pokeName, pokeId) => {
		setPokeTries(pokeTries => [...pokeTries, { name: pokeName, id: pokeId }])
	}

	if (loading) {
		return <div><h2 className='text-white text-xl text-center'>{translate('loading', lang)}</h2></div>
	}

	return (
		<main className='text-white flex-1'>
			<div className='flex flex-col md:justify-center py-2'>
				<PokedleInput onPokemonClick={handlePokemonClick} pokedex={allPokemon} language={lang} />
				<table className='w-full md:w-[60%] xl:self-center border-spacing-2 border-separate'>
					<thead>
						{pokeTries.length > 0 && (
							<tr>
								<th>Tipo 1</th>
								<th>Tipo 2</th>
								<th>Altura</th>
								<th>Peso</th>
								<th>Habilidad 1</th>
								<th>Habilidad 2</th>
								<th>Habilidad 3</th>
								<th>Stats base</th>
								<th>Generación</th>
								<th>Imagen</th>
							</tr>
						)}
					</thead>
					<tbody className='text-center'>
						{
							pokeTries.map((pokeTry, index) => {
								return (
									<PokemondleTry key={index} pokemon={pokemon} pokeTry={pokeTry} language={lang} />
								)
							})
						}
					</tbody>
				</table>
			</div>
		</main>
	)
}
