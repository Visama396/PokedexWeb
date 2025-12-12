import { useState, useEffect } from 'react'
import { translate } from '../utils/translate'

export default function NavBar({ lang, handleLanguageChange }) {
	const [language, setLanguage] = useState(lang ?? 'en')

	useEffect(() => {
		handleLanguageChange(language)
	}, [language])

	return (
		<nav className='flex align-center sticky top-0 bg-[#111] z-10'>
			<a href='/' className='inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>{translate('home', language)}</a>
			<a href='/pokedle' className='inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>Pokedle</a>
			<a href='/pokedlearcade' className='inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>Pokedle Arcade</a>
			<div className='inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>
				<span>{ language }</span>
				<div className='flex flex-col gap-2'>
					<button onClick={() => setLanguage('en')}>English</button>
					<button onClick={() => setLanguage('es')}>Español</button>
					<button onClick={() => setLanguage('de')}>Deutsch</button>
					<button onClick={() => setLanguage('ja')}>日本語</button>
					<button onClick={() => setLanguage('ko')}>한국어</button>
				</div>
			</div>
		</nav>
	)
}
