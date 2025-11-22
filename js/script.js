// Seleção de elementos HTML (Setup Inicial)
let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

// Função que inicia a busca de dados e filtra os resultados
async function iniciarBusca() {
    // Busca os dados do JSON apenas na primeira vez (cache)
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            // Verifica se a resposta foi bem-sucedida
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

    // Processo de filtragem
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descrição.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

// Função que cria e exibe os cards no HTML
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

// --- NOVO CÓDIGO PARA INICIAR A BUSCA AO CARREGAR A PÁGINA ---

// 1. Chama a função iniciarBusca() assim que o DOM (HTML) estiver totalmente carregado.
document.addEventListener('DOMContentLoaded', iniciarBusca);

// 2. Adiciona um Listener ao campo de busca para acionar a função iniciarBusca()
//    sempre que o usuário digitar (evento 'input').
campoBusca.addEventListener('input', iniciarBusca);