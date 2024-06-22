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

    function Carousel(item, isActive) {
        const carouselInner = document.getElementById('carousel-inner');
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${isActive ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${item.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="carousel-caption d-none d-md-block"></div>
        `;
        carouselInner.appendChild(carouselItem);
    }

    function ColegaDeTrabalho(colega) {
        const colegasSection = document.getElementById('colegas_section');
        const colegaCard = document.createElement('div');
        colegaCard.className = 'col-12 col-md-6 col-lg-4';
        colegaCard.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${colega.fotoUrl}" alt="Foto de ${colega.nome}">
                <div class="card-body">
                    <h4 class="card-title">${colega.nome}</h4>
                    <p class="card-text">GitHub: </p><p><a href="${colega.githubUrl}" target="_blank">Acessar</a></p>
                </div>
            </div>
        `;
        colegasSection.appendChild(colegaCard);
    }

    fetch('https://api.github.com/users/rianpuc/repos')
    .then(response => response.json())
    .then(data => {
        const reposSection = document.getElementById('repositorios_section');
        data.forEach(repo => {
            const repoElement = document.createElement('div');
            const descricao = cortarTexto(repo.description || 'Sem descrição', 20);
            repoElement.className = 'col-12 col-md-6 col-lg-4';
            repoElement.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${descricao}</p>
                        </div>
                        <div class="card-footer">
                            <a href="repo.html?id=${repo.id}" class="btn btn-primary btn-sm" target="_blank">Ver detalhes</a>
                        </div>
                    </div>
                </div>
            `;
            reposSection.appendChild(repoElement);
        });
    })
    .catch(error => console.error('Erro ao obter os repositórios:', error));

    fetch('http://localhost:3000/conteudos')
    .then(response => response.json())
    .then(data => {
        data.forEach((item, index) => {
            Carousel(item, index === 0);
        });
    })
    .catch(error => console.error('Erro ao obter os conteúdos:', error));

    fetch('http://localhost:3000/colegas')
    .then(response => response.json())
    .then(data => {
        data.forEach(colega => {
            ColegaDeTrabalho(colega);
        });
    })
    .catch(error => console.error('Erro ao obter os colegas de trabalho:', error));

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