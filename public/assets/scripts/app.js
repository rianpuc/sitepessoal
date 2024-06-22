function toggleMenu(){
    const menu = document.querySelector(".menu-itens");
    const icon = document.querySelector(".menu-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.github.com/users/rianpuc/repos')
        .then(response => response.json())
        .then(data => {
            const reposDiv = document.getElementById('repositorios_section');
            data.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.className = 'card';
                repoElement.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description || 'Sem descrição'}</p>
                    <a href="${repo.html_url}" target="_blank">Acessar repositório</a>
                `;
                reposDiv.appendChild(repoElement);
            });
        })
        .catch(error => console.error('Erro ao obter os repositórios:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.github.com/users/rianpuc')
        .then(response => response.json())
        .then(data => {
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('nome').textContent = data.name;
            document.getElementById('descricao').textContent = data.bio;
        })
        .catch(error => console.error('Erro ao obter o perfil do usuário:', error));
});