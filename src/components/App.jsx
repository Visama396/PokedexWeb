import { useState, useEffect } from 'react'

export default function App() {
	const [language, setLanguage] = useState('en')

	return (
		<main className='flex flex-col items-center justify-center'>
			<h1>Pokedex</h1>
		</main>
	)
}
