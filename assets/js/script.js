// Função que impede o comportamento padrão e carrega o conteúdo via AJAX

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os links com a classe "load-content"
    let links = document.querySelectorAll('a.load-content');

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão (navegar e rolar para o topo)

            let linkConteudo = link.getAttribute('href'); // Obtém o valor do href (URL do arquivo)
            let divConteudo = document.getElementById('content'); // Seleciona a div de conteúdo

            // Verifica se o conteúdo já está carregado e limpa a div se necessário
            if (divConteudo.getAttribute('data-loaded') === linkConteudo) {
                divConteudo.innerHTML = ''; // Limpa o conteúdo
                divConteudo.removeAttribute('data-loaded'); // Remove o atributo indicando que está carregado
                return; // Sai da função para evitar carregar o conteúdo novamente
            }

            // Cria a requisição AJAX para carregar o conteúdo dinamicamente
            let xhr = new XMLHttpRequest();
            xhr.open('GET', linkConteudo, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // Insere o conteúdo na div com o id "content"
                    divConteudo.innerHTML = xhr.responseText;
                    divConteudo.setAttribute('data-loaded', linkConteudo); // Marca qual conteúdo foi carregado
                } else {
                    console.error('Erro ao carregar o conteúdo: ' + xhr.status);
                }
            };
            xhr.onerror = function () {
                console.error('Erro de conexão ao tentar carregar o conteúdo.');
            };
            xhr.send();
        });
    });
});


// FUNÇÃO QUE COMANDA OS BOTÕES DE ROLAGEM
// Captura os elementos pelo ID
const imageContainer = document.getElementById('imageContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

// Função para calcular o tamanho da rolagem baseado na largura visível do contêiner
function getScrollAmount() {
    const containerWidth = imageContainer.offsetWidth; // Largura visível do contêiner
    const imageWidth = imageContainer.querySelector('img').offsetWidth; // Largura de uma imagem
    const imagesInView = Math.floor(containerWidth / imageWidth); // Quantas imagens cabem na tela
    return imagesInView * imageWidth; // Retorna a quantidade de pixels a rolar
}

// Função para rolar suavemente para um determinado ponto
function smoothScrollTo(position) {
    imageContainer.scrollTo({
        left: position,
        behavior: 'smooth' // Rolagem suave
    });
}

// Função para rolar para a esquerda com rolagem infinita
scrollLeftBtn.addEventListener('click', function () {
    const scrollAmount = getScrollAmount(); // Calcula a quantidade de rolagem
    if (imageContainer.scrollLeft === 0) {
        // Se estiver no início, move suavemente para o final
        smoothScrollTo(imageContainer.scrollWidth - imageContainer.clientWidth);
    } else {
        // Caso contrário, rola normalmente para a esquerda
        imageContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth' // Rolagem suave
        });
    }
});

// Função para rolar para a direita com rolagem infinita
scrollRightBtn.addEventListener('click', function () {
    const scrollAmount = getScrollAmount(); // Calcula a quantidade de rolagem
    if (imageContainer.scrollLeft + imageContainer.clientWidth >= imageContainer.scrollWidth) {
        // Se estiver no final, volta suavemente para o início
        smoothScrollTo(0);
    } else {
        // Caso contrário, rola normalmente para a direita
        imageContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth' // Rolagem suave
        });
    }
});


// //script para a navbar
// const navbar = document.getElementById("navbar");
// const submenuBtn = document.querySelector("#submenu-btn");
// const submenuParent = submenuBtn.parentElement;

// let lastScrollPosition = 0;
// const scrollThreshold = 200;
// let submenuOpen = false; // Estado do submenu

// // Função para controlar a visibilidade da navbar
// const handleNavbarVisibility = () => {
//     if (submenuOpen) return; // Não aplica a lógica se o submenu estiver aberto

//     const currentScrollPosition = window.scrollY;

//     if (currentScrollPosition > scrollThreshold) {
//         if (currentScrollPosition > lastScrollPosition) {
//             navbar.classList.add("hidden"); // Esconde a navbar
//         } else {
//             navbar.classList.remove("hidden"); // Mostra a navbar
//         }
//     } else {
//         navbar.classList.remove("hidden"); // Sempre visível antes do limite
//     }

//     lastScrollPosition = currentScrollPosition;
// };

// // Abre/fecha o submenu
// submenuBtn.addEventListener("click", (e) => {
//     e.preventDefault(); // Evita comportamento padrão do botão
//     submenuOpen = !submenuOpen; // Alterna o estado
//     submenuParent.classList.toggle("submenu-active", submenuOpen); // Adiciona/Remove classe do submenu
// });

// // Evento de scroll
// window.addEventListener("scroll", handleNavbarVisibility);

// // Fecha o submenu ao clicar fora
// document.addEventListener("click", (e) => {
//     if (!submenuParent.contains(e.target)) {
//         submenuOpen = false;
//         submenuParent.classList.remove("submenu-active");
//     }
// });


//Ano dinâmico
document.getElementById('year').textContent = new Date().getFullYear();
