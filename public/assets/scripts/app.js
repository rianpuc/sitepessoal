function toggleMenu(){
    const menu = document.querySelector(".menu-itens");
    const icon = document.querySelector(".menu-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function() {
    function cortarTexto(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    fetch('https://api.github.com/users/rianpuc/repos')
    .then(response => response.json())
    .then(data => {
        const reposSection = document.getElementById('repositorios_section');
        data.forEach(repo => {
            const repoElement = document.createElement('div');
            const descricao = cortarTexto(repo.description || 'Sem descrição', 20);
            repoElement.className = 'col-md-4';
            repoElement.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${descricao}</p>
                        <a href="repo.html?id=${repo.id}" class="btn btn-primary" target="_blank">Ver detalhes</a>
                    </div>
                </div>
            `;
            reposSection.appendChild(repoElement);
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