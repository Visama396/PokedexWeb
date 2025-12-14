import { useState, useEffect } from 'react'

export default function App({ lang = 'en' }) {
	const [language, setLanguage] = useState(lang)

	return (
		<main className='flex flex-col items-center justify-center'>
			<h1>Pokedex</h1>
			<h2>{language}</h2>
		</main>
	)
}
