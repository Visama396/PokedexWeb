import { translate } from '../utils/translate'

export default function Footer({ language = 'es' }) {
	return (
		<footer>
			<p>{translate('footer', language)}</p>
		</footer>
	)
}
