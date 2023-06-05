
import { drawChart } from './script';

function main() {

	fetch('http://localhost:3001/api')
		.then(response => response.json())
		.then(data => {

			console.log(data);

			const dataList = document.getElementById('dataList');
			const svgContainer = document.getElementById('container');
			// Process the received data here
			// Object.values(data).forEach(key => {

			//   key.forEach(i => {

			//     const listItem = document.createElement('li');
			//     listItem.textContent = i;
			//     dataList.appendChild(listItem);
			//   })
			// });
			Object.keys(data).forEach(key => {
				const listItem = document.createElement('li');
				const button = document.createElement('button');
				button.textContent = key;
				listItem.appendChild(button);
				dataList.appendChild(listItem);

				// Add click event listener to the button
				button.addEventListener('click', () => {
					// Clear existing list items
					// console.log("He/llo There")
					while (dataList.firstChild) {
						dataList.firstChild.remove();
					}
					// console.log(data[key])

					Object.values(data[key]).forEach(i => {
						const listItem = document.createElement('li');
						const button = document.createElement('button');
						button.textContent = i;
						listItem.appendChild(button);
						dataList.appendChild(listItem);
						// console.log(i)
						button.addEventListener('click', () => {
							svgContainer.innerHTML = '';
							console.log(i)
							drawChart(i)
						});
					});
				});

			});

		})
		.catch(error => {
			// Handle any errors that occurred during the request
			console.error('Error:', error);
		});

}
