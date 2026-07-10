export function getClientId() {

    let id = localStorage.getItem("clientId");

    if (!id) {
        id = Math.random().toString(36).substring(2,10);
        localStorage.setItem("clientId", id);
    }

    return id;

}