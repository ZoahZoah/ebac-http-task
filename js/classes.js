export class Client {
	#id;
	#name;
	#email;
	constructor(id, name, email) {
		this.#id = id;
		this.#name = name;
		this.#email = email;
	}

	// colocando getter and setter
	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get email() {
		return this.#email;
	}
}

export class ClientList {
	#clients;
	constructor(...clients) {
		this.#clients = clients;
	}
    get clients() {
        return this.#clients;
    }

	getClientByID(id) {
		return this.#clients.find((client) => client.id === id);
	}

    async deleteClientByID(id, url) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Falha ao deletar no servidor");
            this.#clients = this.#clients.filter(client => client.id !== id);
            
            console.log(`Cliente ${id} deletado com sucesso.`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

