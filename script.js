// Function to fetch cryptocurrency data from CoinRanking API
async function fetchCryptoData() {
	try {
		const response = await
			fetch('https://api.coinranking.com/v2/coins');
		const data = await response.json();
		return data.data.coins;
	} catch (error) {
		console.error('Error fetching cryptocurrency data:', error);
		return [];
	}
}

// Function to display cryptocurrency data in the table
function displayCryptoData(coins) {
	const cryptoTable = document.getElementById('cryptoTable');
	cryptoTable.innerHTML = '';

	coins.forEach(coin => {
		const row = document.createElement('tr');
		row.innerHTML = `
		<td><img src="${coin.iconUrl}"
		class="crypto-logo" alt="${coin.name}"></td>
			<td>${coin.name}</td>
			<td>${coin.symbol}</td>
			<td>$${coin.price}</td>
			<td>${coin.change}%</td>
			<td>${coin.volume ? coin.volume : '-- N/A --'}</td>
			<td>${coin.marketCap ? coin.marketCap : '-'}</td>
		`;
		cryptoTable.appendChild(row);
	});
}

// Function to filter cryptocurrencies based on user input
function filterCryptoData(coins, searchTerm) {
	searchTerm = searchTerm.toLowerCase();

	const filteredCoins = coins.filter(coin =>
		coin.name.toLowerCase().includes(searchTerm) ||
		coin.symbol.toLowerCase().includes(searchTerm)
	);

	return filteredCoins;
}

// Function to handle search input
function handleSearchInput() {
	const searchInput = document.getElementById('searchInput');
	const searchTerm = searchInput.value.trim();

	fetchCryptoData().then(coins => {
		const filteredCoins = filterCryptoData(coins,
			searchTerm);
		displayCryptoData(filteredCoins);
	});
}

// Function to initialize the app
async function initializeApp() {
	const coins = await fetchCryptoData();
	displayCryptoData(coins);

	// Add event listener to search input
	const searchInput =
		document.getElementById('searchInput');
	searchInput.addEventListener('input',
		handleSearchInput);
	copyrightYear();
	separator();
	license();
	separator2();
	developer();
}

// Call initializeApp function
// when the DOM content is loaded
document.addEventListener('DOMContentLoaded'
	, initializeApp);

function copyrightYear() {
	var year = new Date().getFullYear();
	const repositoryURL = "https://github.com/devsujay19/CryptoTracker";
	const repositoryName = "CryptoTracker";
	document.getElementById("appName").innerText = repositoryName;
	document.getElementById("copyrightYear").innerHTML = `&copy; ${year} | <a href=${repositoryURL}>${repositoryName}<a>`;
};

function separator() {
	document.getElementById("separator").innerHTML = `&middot;`;
};

function license() {
	const licenseFileURL = "https://github.com/devsujay19/CryptoTracker/blob/main/LICENSE";
	const license = "MIT";
	document.getElementById("license").innerHTML = `Released under <a href="${licenseFileURL}">${license}</a>`;
};

function separator2() {
	document.getElementById("separator2").innerHTML = `&middot;`;
};

function developer() {
    const developerURL = "https://github.com/devsujay19";
    const developerName = "Sujay Mukherjee";
	document.getElementById("developer").innerHTML = `<a href="${developerURL}">${developerName}</a>`;
};