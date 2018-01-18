import axios from 'axios'

export function post (url, form) {
	return new Promise((resolve, reject) => {
		axios.post(url, form).then(response => {
			if (response.status === 200) {
				resolve(response.data)
			} else {
				reject(response.data.message)
			}
		}).catch(e => {
			reject(e)
		})
	})
}

export function get (url, form = {}, cache = false) {
	if (cache) {
		const key = url + form.toString()
    const sessionData = window.sessionStorage.getItem(key)
		return new Promise((resolve, reject) => {
			if (sessionData) {
				resolve(JSON.parse(sessionData))
			} else {
				getFromServer(url, form).then(data => {
					window.sessionStorage.setItem(key, JSON.stringify(data))
					resolve(data)
				}).catch(e => {
					reject(e)
				})
			}
		})
	} else {
		return getFromServer(url, form)
	}
}

function getFromServer (url, params) {
  return new Promise(function (resolve, reject) {
		if (Object.getOwnPropertyNames(params).length > 0) {
			url += '?'
			for (const f in params) {
				url += f + '=' + params[f] + '&'
			}
			url = url.substring(0, url.length - 1)
		}
		axios.get(url).then(response => {
			if (response.status === 200) {
				resolve(response.data)
			} else {
				reject(response.data.message)
			}
		}).catch(e => {
			reject(e)
		})
	})
}
