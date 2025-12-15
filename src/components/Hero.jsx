import { useState, useEffect } from 'react'

export default function Hero({ language = 'en', showSubtitle = true }) {
	return (
		<div id='top' className='py-4 md:py-8'>
			<h1 className='font-black uppercase text-2xl md:text-5xl lg:text-6xl text-center text-white' style={{ textShadow: '0px 0px 10px rgba(255,255,255,0.7)' }}>Pokédex</h1>
			{showSubtitle && <h2 className='text-gray-400'>Powered by <a href='https://pokeapi.co/' target='_blank' rel='noopener noreferrer' className='text-[#ffeca1] font-medium hover:text-[#fde070]'>PokeAPI</a> database and its community.</h2>}
		</div>
	)
}
