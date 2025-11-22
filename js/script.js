let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }
            dados = await resposta.json();
        } catch (error) {
            console.error("falha ao buscar dados: ", error);
            cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Verifique o arquivo data.json.</p>";
            return;
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descrição.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";
    if (dados.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado para o termo de busca.</p>";
        return;
    }
    
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descrição}</p>
        <p><span class="label-tecnologia">Tecnologias:</span>${dado.tecnologia}</p>`
        cardContainer.appendChild(article);
    }
}

document.addEventListener('DOMContentLoaded', iniciarBusca);
campoBusca.addEventListener('input', iniciarBusca);