document.addEventListener('DOMContentLoaded', function () {
	const enableBtn = document.getElementById('enableBtn')
	const disableBtn = document.getElementById('disableBtn')
	const statusDiv = document.getElementById('status')

	updateStatus()

	enableBtn.addEventListener('click', function () {
		chrome.runtime.sendMessage({ action: 'enableProxy' }, function (response) {
			if (response.success) {
				statusDiv.textContent = 'Прокси включен (127.0.0.1:8881)'
				statusDiv.className = 'status-enabled'
			} else {
				statusDiv.textContent = 'Ошибка: ' + response.message
				statusDiv.className = 'status-disabled'
			}
		})
	})

	disableBtn.addEventListener('click', function () {
		chrome.runtime.sendMessage({ action: 'disableProxy' }, function (response) {
			if (response.success) {
				statusDiv.textContent = 'Прокси выключен'
				statusDiv.className = 'status-disabled'
			} else {
				statusDiv.textContent = 'Ошибка: ' + response.message
				statusDiv.className = 'status-disabled'
			}
		})
	})

	function updateStatus() {
		chrome.runtime.sendMessage({ action: 'getStatus' }, function (response) {
			if (response.enabled) {
				statusDiv.textContent = 'Прокси включен (127.0.0.1:8881)'
				statusDiv.className = 'status-enabled'
			} else {
				statusDiv.textContent = 'Прокси выключен'
				statusDiv.className = 'status-disabled'
			}
		})
	}
})
