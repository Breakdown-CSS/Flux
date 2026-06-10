
publicar.addEventListener("click", () => {

    if(contenido.value.trim() === ""){
        return;
    }

    const post = document.createElement("div");
    post.classList.add("post");

    const fecha = new Date().toLocaleString();

    post.innerHTML = `
        <h3>${nombrePerfil.textContent}</h3>

        <p>${contenido.value}</p>

        <small>${fecha}</small>

        <hr>

        <button class="like-btn">
            👍 Like
        </button>

        <span class="likes">
            0 Likes
        </span>

        <div class="comentarios">

            <input
                type="text"
                class="comentario-input"
                placeholder="Escribe un comentario">

            <button class="comentar-btn">
                Comentar
            </button>

            <div class="lista-comentarios">

            </div>

        </div>
    `;

    feed.prepend(post);

    contenido.value = "";

    // Sistema de likes

    const likeBtn =
    post.querySelector(".like-btn");

    const likesTexto =
    post.querySelector(".likes");

    let likes = 0;

    likeBtn.addEventListener("click", () => {

        likes++;

        likesTexto.textContent =
        `${likes} Likes`;

    });

    // Sistema de comentarios

    const comentarBtn =
    post.querySelector(".comentar-btn");

    const comentarioInput =
    post.querySelector(".comentario-input");

    const listaComentarios =
    post.querySelector(".lista-comentarios");

    comentarBtn.addEventListener("click", () => {

        if(comentarioInput.value.trim() === ""){
            return;
        }

        const comentario =
        document.createElement("p");

        comentario.textContent =
        comentarioInput.value;

        listaComentarios.appendChild(comentario);

        comentarioInput.value = "";

    });

});
