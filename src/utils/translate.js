import es from '../data/locale/es.json'
import en from '../data/locale/en.json'
import de from '../data/locale/de.json'
import ja from '../data/locale/ja.json'
import ko from '../data/locale/ko.json'

export const translate = (key, language = 'en') => {
	switch (language) {
	case 'es':
		return es[key] || key
	case 'de':
		return de[key] || key
	case 'ja':
		return ja[key] || key
	case 'ko':
		return ko[key] || key
	default:
		return en[key] || key
	}
}
