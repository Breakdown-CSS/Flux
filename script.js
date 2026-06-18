const avatar =
document.getElementById("avatar");

const fotoPerfil =
document.getElementById("fotoPerfil");

const nombrePerfil =
document.getElementById("nombrePerfil");

const publicar =
document.getElementById("publicar");

const contenido =
document.getElementById("contenido");

const feed =
document.getElementById("feed");

const registro =
document.getElementById("registro");

const app =
document.getElementById("app");

const nombreRegistro =
document.getElementById("nombreRegistro");

const usuarioRegistro =
document.getElementById("usuarioRegistro");

const usuarioPerfil =
document.getElementById("usuarioPerfil");

const fotoRegistro =
document.getElementById("fotoRegistro");

const previewRegistro =
document.getElementById("previewRegistro");

const btnRegistro =
document.getElementById("btnRegistro");

const biografiaPerfil =
document.getElementById("biografiaPerfil");

const biografiaInput =
document.getElementById("biografiaInput");

const guardarBio =
document.getElementById("guardarBio");

const contadorBio =
document.createElement("div");

contadorBio.style.fontSize =
"12px";

contadorBio.style.color =
"#666";

contadorBio.textContent =
"0 / 160";

biografiaInput.parentNode.insertBefore(
    contadorBio,
    guardarBio
);

const pantallaCarga =
document.getElementById("pantallaCarga");

const modoOscuro =
document.getElementById("modoOscuro");

const contadorPosts =
document.getElementById("contadorPosts");

const contadorTexto = document.createElement("div");

contadorTexto.style.fontSize = "12px";
contadorTexto.style.color = "#666";
contadorTexto.style.marginTop = "5px";

contenido.parentNode.appendChild(contadorTexto);

let cantidadPosts = 0;

let postEditando = null;

contenido.addEventListener("input", () => {

    const max = 280;
    const actual = contenido.value.length;

    contadorTexto.textContent =
    `${actual} / ${max}`;

    if(actual >= max){

        contadorTexto.style.color =
        "red";

    }else{

        contadorTexto.style.color =
        "#666";

    }

});

function obtenerTiempoRelativo(fechaPost){

    const ahora = new Date();

    const diferencia =
    Math.floor(
        (ahora - fechaPost) / 1000
    );

    if(diferencia < 60){
        return "Ahora mismo";
    }

    if(diferencia < 3600){
        return `Hace ${Math.floor(diferencia / 60)} minutos`;
    }

    if(diferencia < 86400){
        return `Hace ${Math.floor(diferencia / 3600)} horas`;
    }

    return `Hace ${Math.floor(diferencia / 86400)} días`;

}

fotoPerfil.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatar.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

fotoRegistro.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = (e) => {

            previewRegistro.src =
            e.target.result;

        };

        reader.readAsDataURL(file);

    }

});

btnRegistro.addEventListener("click", () => {

    if(nombreRegistro.value.trim() === ""){

        alert("Debes escribir un nombre");

        return;
    }

nombrePerfil.textContent =
nombreRegistro.value.trim();

if(usuarioRegistro.value.trim() === ""){

    alert("Debes escribir un nombre de usuario");

    return;

}

usuarioPerfil.textContent =
"@" + usuarioRegistro.value.trim();

    avatar.src =
    previewRegistro.src;

    nombreRegistro.value = "";
    usuarioRegistro.value = "";
    fotoRegistro.value = "";

    registro.style.display =
    "none";

    app.style.display =
    "block";

});

guardarBio.addEventListener("click", () => {

    if(biografiaInput.value.trim() === ""){
        return;
    }

    biografiaPerfil.textContent =
    biografiaInput.value.trim();

    biografiaInput.value = "";

contadorBio.textContent =
"0 / 160";

contadorBio.style.color =
"#666";

});

biografiaInput.addEventListener(
"input",
() => {

    const actual =
    biografiaInput.value.length;

    contadorBio.textContent =
    `${actual} / 160`;

    if(actual >= 160){

        contadorBio.style.color =
        "red";

    }else{

        contadorBio.style.color =
        "#666";

    }

});

modoOscuro.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        modoOscuro.textContent =
        "☀️ Modo claro";

    }else{

        modoOscuro.textContent =
        "🌙 Modo oscuro";

    }

});

publicar.addEventListener("click", () => {

    if(contenido.value.trim() === ""){
        return;
    }

    // 🔥 SI ESTAMOS EDITANDO UNA PUBLICACIÓN
    if(postEditando){

const textoEditado = postEditando.querySelector("p");

if (textoEditado) {
    textoEditado.textContent = contenido.value;
}

        postEditando = null;

        publicar.textContent = "Publicar";

contenido.value = "";

contadorTexto.textContent =
"0 / 280";

contadorTexto.style.color =
"#666";

return;

    if(contenido.value.trim() === ""){
        return;
    }

    const post = document.createElement("div");
    post.classList.add("post");

  const fecha = new Date();

const tiempoRelativo =
obtenerTiempoRelativo(fecha);

    post.innerHTML = `
        <div class="autor-post">

    <img
    class="avatar-post"
    src="${avatar.src}">

    <h3>${nombrePerfil.textContent}</h3>

</div>

        <p>${contenido.value}</p>

 <small class="fecha-post">
    ${tiempoRelativo}
</small>

<hr>

<button class="like-btn">
    👍 Like
</button>

<span class="likes">
    0 Likes
</span>

<br>

<button class="editar-post">
    ✏ Editar
</button>

<button class="eliminar-post">
    🗑 Eliminar
</button>

        <div class="comentarios">

<input
    type="text"
    class="comentario-input"
    maxlength="150"
    placeholder="Escribe un comentario">

    <div class="contador-comentario">
    0 / 150
</div>

            <button class="comentar-btn">
                Comentar
            </button>

            <div class="lista-comentarios">

            </div>

        </div>
    `;

feed.prepend(post);

cantidadPosts++;

contadorPosts.textContent =
`Publicaciones: ${cantidadPosts}`;

contenido.value = "";

contadorTexto.textContent =
"0 / 280";

contadorTexto.style.color =
"#666";

// =========================
// ✏️ BOTÓN EDITAR (AQUÍ VA)
// =========================

const editarBtn = post.querySelector(".editar-post");

editarBtn.addEventListener("click", () => {

    const textoPost = post.querySelector("p");

    if (!textoPost) return;

    contenido.value = textoPost.textContent;

    postEditando = post;

    publicar.textContent = "Guardar cambios";

});

const eliminarBtn =
post.querySelector(".eliminar-post");

    const likeBtn =
    post.querySelector(".like-btn");

    const likesTexto =
    post.querySelector(".likes");

  let likes = 0;
let dioLike = false;

likeBtn.addEventListener("click", () => {

    if(dioLike){

        likes--;

        dioLike = false;

        likeBtn.textContent =
        "👍 Like";

    }else{

        likes++;

        dioLike = true;

        likeBtn.textContent =
        "❤️ Te gusta";

    }

    likesTexto.textContent =
    `${likes} Likes`;

});

eliminarBtn.addEventListener("click", () => {

    const confirmar =
    confirm("¿Eliminar esta publicación?");

    if(!confirmar){
        return;
    }

    post.remove();

    cantidadPosts--;

    contadorPosts.textContent =
    `Publicaciones: ${cantidadPosts}`;

});

    // Sistema de comentarios

    const comentarBtn =
    post.querySelector(".comentar-btn");

    const comentarioInput =
    post.querySelector(".comentario-input");

    const contadorComentario =
post.querySelector(".contador-comentario");

comentarioInput.addEventListener("input", () => {

    const max = 150;
    const actual =
    comentarioInput.value.length;

    contadorComentario.textContent =
    `${actual} / ${max}`;

    if(actual >= max){

        contadorComentario.style.color =
        "red";

    }else{

        contadorComentario.style.color =
        "#666";

    }

});

    const listaComentarios =
    post.querySelector(".lista-comentarios");

    comentarBtn.addEventListener("click", () => {

        if(comentarioInput.value.trim() === ""){
            return;
        }

        const comentario =
document.createElement("div");

comentario.classList.add(
    "comentario"
);

comentario.innerHTML = `

<div class="autor-comentario">

    <img
    class="avatar-comentario"
    src="${avatar.src}">

    <strong>
        ${nombrePerfil.textContent}
    </strong>

</div>

<p>
    ${comentarioInput.value}
</p>

`;

        listaComentarios.appendChild(comentario);

        comentarioInput.value = "";

contadorComentario.textContent =
"0 / 150";

contadorComentario.style.color =
"#666";

    });

});

window.addEventListener("load", () => {

    setTimeout(() => {

        pantallaCarga.style.display =
        "none";

    }, 2000);

});
