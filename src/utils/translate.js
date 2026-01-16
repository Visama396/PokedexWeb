import es from '../data/locale/es.json'
import en from '../data/locale/en.json'
import de from '../data/locale/de.json'
import ja from '../data/locale/ja.json'
import ko from '../data/locale/ko.json'

/**
 *
 * @param {string} key The keyword that identifies the translation
 * @param {string} language The language code to translate the keyword, default is 'en'. Options are: 'es', 'de', 'ja', 'ko'
 * @returns {string} The translated string
 */
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

/**
 *
 * @param {string} key The keyword that identifies the translation
 * @param {string[]} words The words to replace in the translation
 * @param {string} language The language code to translate the keyword, default is 'en'. Options are: 'es', 'de', 'ja', 'ko'
 * @returns {string} The translated string
 */
export const translateWithWords = (key, words, language = 'en') => {
	let result = key
	switch (language) {
	case 'es':
		result = es[key] || key
		break
	case 'de':
		result = de[key] || key
		break
	case 'ja':
		result = ja[key] || key
		break
	case 'ko':
		result = ko[key] || key
		break
	default:
		result = en[key] || key
	}
	for (let i = 0; i < words.length; i++) {
		const index = 'n' + (i + 1)
		result = result.replace(`${index}`, words[i])
	}

	return result
}
