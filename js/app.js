import { getElement, fetchData } from "./utils.js";
import { Client, ClientList } from "./classes.js";

const url = "https://crudcrud.com/api/71666f34a913416b90212331ff1aedd4/client";
const bttnSignUp = getElement("bttnClientSignUp");

renderTable();

async function renderTable() {
	const bodyClientTable = getElement("bodyClientTable");
	let responseJson = await fetchData(url);

	bodyClientTable.innerHTML = ``;
	let clientsArray = responseJson.map((client) => {
		return new Client(client._id, client.name, client.email);
	});

	let clientListInstance = new ClientList(...clientsArray);

	clientListInstance.clients.forEach((client) => {
		const tableRow = document.createElement("tr");

		tableRow.innerHTML = `
        <td>${client.id}</td>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td><button class="btn-delete">X</button></td>
    `;

		const btnDelete = tableRow.querySelector(".btn-delete");

		btnDelete.addEventListener("click", async () => {
			const confirmed = confirm("Tem certeza que deseja deletar?");

			if (confirmed) {
				const success = await clientListInstance.deleteClientByID(
					client.id,
					url
				);

				if (success) {
					tableRow.remove();
				} else {
					alert("Erro ao deletar cliente.");
				}
			}
		});

		bodyClientTable.appendChild(tableRow);
	});
}


bttnSignUp.addEventListener("click", async (event) => {
	event.preventDefault();
	let clientName = getElement("client").value;
	let clientEmail = getElement("email").value;

    console.log(clientName, clientEmail);
	let response = await fetch
    (url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: clientName, email: clientEmail }),
	});
    console.log("Client added:", response);
    await renderTable();
});
