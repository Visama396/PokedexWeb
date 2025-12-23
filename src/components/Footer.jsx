import { translate } from '../utils/translate'

export default function Footer({ language = 'es' }) {
	return (
		<footer>
			<p className='text-gray-400'>{translate('footer', language)}</p>
		</footer>
	)
}
