import { translate } from '../utils/translate'

export default function NavBar({ language = 'en', handleLanguageChange }) {
	return (
		<nav className='flex align-center sticky top-0 bg-[#111] z-10'>
			<a href='/' className='inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>{translate('home', language)}</a>
			<a href='/pokedle' className='inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>Pokedle</a>
			<a href='/pokedlearcade' className='inline-block p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>Pokedle Arcade</a>
			<div className='group relative inline-block text-center p-4 text-white duration-500 ease-in-out hover:bg-slate-400'>
				<span>{translate('language', language)} { language }</span>
				<div className='hidden absolute group-hover:flex flex-col bg-[#222] top-full'>
					<button className='hover:bg-slate-500 duration-500 p-4' onClick={() => handleLanguageChange('en')}>English</button>
					<button className='hover:bg-slate-500 duration-500 p-4' onClick={() => handleLanguageChange('es')}>Español</button>
					<button className='hover:bg-slate-500 duration-500 p-4' onClick={() => handleLanguageChange('de')}>Deutsch</button>
					<button className='hover:bg-slate-500 duration-500 p-4' onClick={() => handleLanguageChange('ja')}>日本語</button>
					<button className='hover:bg-slate-500 duration-500 p-4' onClick={() => handleLanguageChange('ko')}>한국어</button>
				</div>
			</div>
		</nav>
	)
}
