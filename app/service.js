const fs = require('fs/promises')
const path = require('path')
const { appUsers, githubUsers, countries, countriesStates, countriesStatesCities } = require('../data')

class AppService {
	constructor(){}

	// Get app users data
	async getAppUsersData() {
		try {
			return Promise.resolve(appUsers)
		} catch (err) {
			return null
		}
	}

	// Get github users data
	async getGithubUsersData() {
		try {
			return Promise.resolve(githubUsers)
		} catch (err) {
			return null
		}
	}

	// Get countries data
	async getCountriesData() {
		try {
			return Promise.resolve(countries)
		} catch (err) {
			return null
		}
	}

	// Get countries and states data
	async getCountriesAndStatesData() {
		try {
			return Promise.resolve(countriesStates)
		} catch (err) {
			return null
		}
	}

	// Get countries, states and cities data
	async getCountriesStatesAndCitiesData() {
		try {
			return Promise.resolve(countriesStatesCities)
		} catch (err) {
			return null
		}
	}

	// App information
	async getAppInformation() {
		try {
			const file = path.join(process.cwd() + '/public/intro.html')
			
			if (file && fs.access(file, fs.F_OK)) {
				let content = await fs.readFile(file, { encoding: 'utf-8' })

				return Promise.resolve(content)
			}

			return Promise.resolve('This is a Syntaxe enabled express.js app.')
		} catch (err) {
			return null
		}
	}

	// LG service
	async lifeIsGood() {
		try {
			return Promise.resolve('Life is good!')
		} catch (err) {
			return null
		}
	}
}

module.exports = new AppService()