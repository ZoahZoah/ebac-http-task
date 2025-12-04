let getElement = (id) => document.getElementById(id);

url = "https://crudcrud.com/api/5764bedb133e4a48a0b0e1e971c17d11/clientes";

// Initialize the client list in the page
renderTable();

// Listener to add a client at list
getElement("bttnClientSignUp").addEventListener("click", (event) => {
	event.preventDefault();
	let clientName = getElement("client").value;
	let clientEmail = getElement("email").value;

	fetch(`${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: clientName, email: clientEmail }),
	})
		.then((response) => response.json())
		.then((client) => {
			const tableRow = document.createElement("tr");
			tableRow.innerHTML = `<td>${client._id}</td>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td><button name="bttnExclude" onclick="deleteClient('${client._id}')">X</button></td>`;

			getElement("bodyClientTable").appendChild(tableRow);
		}).then(() => renderTable());
});

// function to delete client at list
function deleteClient(id) {
	console.log(`Excluding: ${id}`);
	fetch(`${url}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then(() => renderTable());
}

// function to render table for each update at list
function renderTable() {
	const bodyClientTable = getElement("bodyClientTable");
	bodyClientTable.innerHTML = ``;
	fetch(`${url}`)
		.then((response) => response.json())
		.then((clientList) => {
			clientList.forEach((client) => {
				const tableRow = document.createElement("tr");
				tableRow.innerHTML = `<td>${client._id}</td>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td><button name="bttnExclude" onclick="deleteClient('${client._id}')">X</button></td>`;

				bodyClientTable.appendChild(tableRow);
			});
		});
}