class ComponentApi {
    static async fetchComponents() {
        try {
            const response = await fetch("http://localhost:8081/api/components");
            if (response.ok) {
                return await response.json();
            } else {
                // Handle error response
                console.error("Error fetching components");
                return null;
            }
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching components:", error);
            return null;
        }
    }

    static async fetchComponentsByOrganization(selectedOrganisation) {
        try {
            const components = await this.fetchComponents();

            if (components && selectedOrganisation) {
                return components.filter((component) =>
                    component.organisations.includes(selectedOrganisation.dn)
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching components by organization:", error);
            return null;
        }
    }

    static async fetchComponentsByName(name) {
        const url = `http://localhost:8081/api/components/${name}`;
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching components by name");
            throw new Response("Not Found", { status: 404 });
        }
    }

    static async createComponent(componentData) {
        console.log("component Data to add:", JSON.stringify(componentData));
        try {
            const response = await fetch("http://localhost:8081/api/components", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(componentData)
            });

            if (response.ok) {
                if (response.status === 201) {
                    return { message: "Komponenten ble opprettet", variant: "success" }; // Component created
                }
                return { message: "Komponenten er oppdatert", variant: "success" }; // Component updated
            } else if (response.status === 302) {
                return { message: "Komponenten finnes fra før", variant: "warning" }; // Component already exists
            } else {
                console.error("Error creating component", response);
                return { message: "Det oppsto en feil ved opprettelse av komponenten.", variant: "error" }; // Error creating component
            }
        } catch (error) {
            console.error("Error creating component:", error);
            return { message: "Det oppsto en feil ved opprettelse av komponenten.", variant: "error" }; // Error creating component
        }
    }

    static async updateComponent(componentData) {
        const url = `http://localhost:8081/api/components/${componentData.name}`;
        console.log("json: ", JSON.stringify(componentData));
        console.log("url: ", url);

        const request = new Request(url, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(componentData)
        });

        return fetch(request).then(response => {
            console.log("Updating a component: ", response);
            return { message: "Komponenten er oppdatert", variant: "info" };
        }).catch(error => {
            console.error("Error updating component", error);
            return { message: "Det oppsto en feil ved oppdatering av komponenten.", variant: "error" };
        });
    }

    static async deleteComponent(componentName) {
        const url = `http://localhost:8081/api/components/${componentName}`;
        console.log("url: ", url);
        const request = new Request(url, {
            method: 'DELETE',
            credentials: 'same-origin'
        });

        const response = await fetch(request);
        if (response.ok) {
            throw new Response("Component successfully removed", 410 );

        } else {
            return { message: "Det oppsto en feil ved sletting av komponenten.", variant: "error" };
        }

    }
}

export default ComponentApi;
