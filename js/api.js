import { CONFIG } from "./config.js";
import { getClientId } from "./client.js";

/**
 * Recupera todas as mentiras
 */
export async function getLies() {

    const response = await fetch(
        `${CONFIG.API_URL}/${CONFIG.BIN_ID}/latest`,
        {
            headers: {
                "X-Access-Key": CONFIG.ACCESS_KEY
            }
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao carregar as mentiras.");
    }

    const json = await response.json();

    return json.record.yan_lies ?? [];

}

/**
 * Salva a lista completa no JSONBin
 */
export async function saveLies(lies) {

    const response = await fetch(
        `${CONFIG.API_URL}/${CONFIG.BIN_ID}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Access-Key": CONFIG.ACCESS_KEY
            },
            body: JSON.stringify({
                yan_lies: lies
            })
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao salvar.");
    }

    return await response.json();

}

/**
 * Calcula o próximo ID
 */
export function nextId(lies) {

    if (lies.length === 0)
        return 1;

    return Math.max(...lies.map(x => x.id)) + 1;

}

/**
 * Adiciona uma nova mentira
 */
export async function addLie(date, lie) {

    const lies = await getLies();

    lies.push({

        id: nextId(lies),

        createdby: getClientId(),

        createdin: new Date().toISOString(),

        date,

        lie

    });

    await saveLies(lies);

}