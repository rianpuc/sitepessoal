function toggleMenu(){
    const menu = document.querySelector(".menu-itens");
    const icon = document.querySelector(".menu-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const repoId = urlParams.get('id');
    fetch(`https://api.github.com/repositories/${repoId}`)
        .then(response => response.json())
        .then(repo => {
            const repoDetails = document.getElementById('repo-details');
            repoDetails.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${repo.name}</h2>
                    <p class="card-text">${repo.description || 'Sem descrição'}</p>
                    <p class="card-text"><strong>Data de Criação:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                    <p class="card-text"><strong>Linguagem Principal:</strong> ${repo.language || 'Texto'}</p>
                    <p class="card-text"><strong>Estrelas:</strong> ${repo.stargazers_count}</p>
                    <p class="card-text"><strong>Observadores:</strong> ${repo.watchers_count}</p>
                    <p class="card-text"><strong>Forks:</strong> ${repo.forks_count}</p>
                    <p class="card-text"><strong>Licença:</strong> ${repo.license ? repo.license.name : 'Sem licença'}</p>
                    <p class="card-text"><strong>Proprietário:</strong> <img src="${repo.owner.avatar_url}" alt="Avatar" style="width: 30px; border-radius: 50%;"> ${repo.owner.login}</p>
                    <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Acessar repositório</a>
                </div>
            `;
        })
        .catch(error => console.error('Erro ao obter os detalhes do repositório:', error));
});