import { useState, useEffect } from 'react'
import Hero from './Hero'
import NavBar from './NavBar'
import Pokedex from './Pokedex'

export default function App({ dex }) {
	const [language, setLanguage] = useState('es')
	const [pokedex, setPokedex] = useState(dex)

	return (
		<div className='flex flex-col items-center justify-center'>
			<NavBar language={language} handleLanguageChange={setLanguage} />
			<Hero language={language} />
			<Pokedex language={language} pokedex={pokedex} />
		</div>
	)
}
