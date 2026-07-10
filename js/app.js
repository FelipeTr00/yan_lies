import { getLies, addLie } from "./api.js";
import {
    renderTable,
    showLoading,
    showError,
    showSuccess,
    clearForm
} from "./ui.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {

    // Preenche a data com hoje
    document.getElementById("date").value =
        new Date().toISOString().split("T")[0];

    // Evento do formulário
    document
        .getElementById("lieForm")
        .addEventListener("submit", onSubmit);

    // Carrega a tabela
    await loadTable();

}

async function loadTable() {

    try {

        showLoading();

        const lies = await getLies();

        renderTable(lies);

    }
    catch (error) {

        console.error(error);

        showError(error.message);

    }

}

async function onSubmit(event) {

    event.preventDefault();

    const lie = document.getElementById("lie").value.trim();

    const date = document.getElementById("date").value;

    if (!lie) {

        showError("Informe a mentira.");

        return;

    }

    try {

        await addLie(date, lie);

        clearForm();

        await loadTable();

        showSuccess("Mentira cadastrada com sucesso.");

    }
    catch (error) {

        console.error(error);

        showError(error.message);

    }

}