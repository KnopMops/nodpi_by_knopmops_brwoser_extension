let proxyEnabled = false
let pythonProcess = null

// Обработчик сообщений от popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'enableProxy') {
		enableProxy()
			.then(() => {
				proxyEnabled = true
				sendResponse({ success: true })
			})
			.catch(error => {
				sendResponse({ success: false, message: error.message })
			})
		return true // Указываем, что ответ будет асинхронным
	}

	if (request.action === 'disableProxy') {
		disableProxy()
			.then(() => {
				proxyEnabled = false
				sendResponse({ success: true })
			})
			.catch(error => {
				sendResponse({ success: false, message: error.message })
			})
		return true
	}

	if (request.action === 'getStatus') {
		sendResponse({ enabled: proxyEnabled })
	}
})

// Включение прокси
async function enableProxy() {
	try {
		// Настройка прокси в браузере
		const config = {
			mode: 'fixed_servers',
			rules: {
				singleProxy: {
					scheme: 'http',
					host: '127.0.0.1',
					port: 8881,
				},
				bypassList: ['localhost', '127.0.0.1'],
			},
		}

		await chrome.proxy.settings.set({ value: config, scope: 'regular' })

		// Запуск Python-скрипта (этот код будет работать только в окружении,
		// где доступно выполнение внешних процессов, например, в Native Messaging)
		console.log('Прокси активирован: 127.0.0.1:8881')
	} catch (error) {
		console.error('Ошибка при включении прокси:', error)
		throw error
	}
}

// Выключение прокси
async function disableProxy() {
	try {
		// Отключение прокси в браузере
		await chrome.proxy.settings.set({
			value: { mode: 'direct' },
			scope: 'regular',
		})

		// Остановка Python-скрипта
		console.log('Прокси деактивирован')
	} catch (error) {
		console.error('Ошибка при выключении прокси:', error)
		throw error
	}
}
