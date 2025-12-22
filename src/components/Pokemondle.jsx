import { useState, useEffect } from 'react'
import NavBar from './NavBar'
import PokedleInput from './PokedleInput'
import PokemondleTry from './PokemondleTry'
import Footer from './Footer'

import { getPokemon, setPokemon } from '../utils/pokemonDB'
import { capitalize, backspaceAndCapitalize } from '../utils/capitalize'
import { getDailyPokemon, getRandomPokemon, getYesterdaysPokemon } from '../utils/getPokemonId'
import { translate, translateWithWords } from '../utils/translate'

export default function Pokemondle({ dex = [], daily, language = 'es' }) {
	const [pokemon, setPokemon] = useState({ generation: '', height: 0, weight: 0, baseStats: 0, sprite: '', types: [], abilities: [], name: '', id: 0 })
	const [pokedex, setPokedex] = useState(dex)
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
	const [yesterdayPokemon, setYesterdayPokemon] = useState('')

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${getYesterdaysPokemon()}`).then(response => response.json()).then(data => setYesterdayPokemon(data.names.find(name => name.language.name === lang).name))

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
	}, [lang])

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
		<div className='flex flex-col min-h-screen'>
			<NavBar language={lang} handleLanguageChange={setLang}  />
			<header class="p-2 mb-4">
				<h1 class="font-black text-3xl md:text-6xl text-center text-white mb-2">Pokedle</h1>
				<h2 class="font-medium text-md md:text-xl text-center text-gray-500">{translate('pokedleDescription', lang)}</h2>
				<h3 class="font-medium text-lg md:text-2xl text-center text-gray-300">{translateWithWords('yesterdayPokemon', [backspaceAndCapitalize(yesterdayPokemon)], lang)}</h3>
			</header>
			<main className='text-white flex-1'>
				<div className='flex flex-col md:justify-center py-2'>
					<PokedleInput onPokemonClick={handlePokemonClick} pokedex={allPokemon} language={lang} />
					<table className='table-fixed w-full xl:w-[90%] xl:max-w-7xl xl:self-center xl:border-spacing-2 xl:border-separate text-xs xl:text-base'>
						<thead>
							{pokeTries.length > 0 && (
								<tr>
									<th className='w-1/10'>Tipo 1</th>
									<th className='w-1/10'>Tipo 2</th>
									<th className='w-1/10'>Altura</th>
									<th className='w-1/10'>Peso</th>
									<th className='w-1/10'>Hab. 1</th>
									<th className='w-1/10'>Hab. 2</th>
									<th className='w-1/10'>Hab. 3</th>
									<th className='w-1/10'>Stats</th>
									<th className='w-1/10'>Gen.</th>
									<th className='w-1/10'>Sprite</th>
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
			<Footer language={lang} />
		</div>
	)
}
