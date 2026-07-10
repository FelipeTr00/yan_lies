/**
 * Renderiza a tabela de mentiras
 */
export function renderTable(lies) {

    const tbody = document.getElementById("liesTable");
    const total = document.getElementById("totalLies");

    tbody.innerHTML = "";

    // Mais recentes primeiro
    lies.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (lies.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="2" class="text-center py-6 text-slate-500">
                    Nenhuma mentira cadastrada.
                </td>
            </tr>
        `;

    } else {

        lies.forEach(item => {

            const tr = document.createElement("tr");

            tr.className = "border-b hover:bg-slate-50";

            tr.innerHTML = `
                <td class="py-3">
                    <span class="inline-block bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
                    ${formatDate(item.date)}
                    </span>
                </td>

                <td class="py-3">
                    ${escapeHtml(item.lie)}
                </td>
            `;

            tbody.appendChild(tr);

        });

    }

    total.textContent = `${lies.length} mentira${lies.length !== 1 ? "s" : ""}`;

}

/**
 * Exibe loading
 */
export function showLoading() {

    const tbody = document.getElementById("liesTable");

    tbody.innerHTML = `
        <tr>
            <td colspan="2" class="text-center py-6">
                Carregando...
            </td>
        </tr>
    `;

}

/**
 * Exibe mensagem de erro
 */
export function showError(message) {

    alert(message);

}

/**
 * Exibe mensagem de sucesso
 */
export function showSuccess(message) {

    alert(message);

}

/**
 * Limpa o formulário
 */
export function clearForm() {

    document.getElementById("lie").value = "";

    document.getElementById("date").value =
        new Date().toISOString().split("T")[0];

}

/**
 * Formata yyyy-mm-dd -> dd/mm/yyyy
 */
function formatDate(date) {

    const d = new Date(date + "T00:00:00");

    return d.toLocaleDateString("pt-BR");

}

/**
 * Evita HTML dentro das mentiras
 */
function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
