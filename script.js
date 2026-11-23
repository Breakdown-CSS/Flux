// =========================
// 🔵 CONEXIÓN CON SUPABASE
// =========================

const SUPABASE_URL =
"https://xbdrhxatzstxukgsikrz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
"sb_publishable_FEWca-AvV6RsIAiwmgfBgA_yRI3M_HR";

const supabaseClient =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

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

const abrirPerfil =
document.getElementById("abrirPerfil");

const volverInicio =
document.getElementById("volverInicio");

const perfilCompleto =
document.getElementById("perfilCompleto");

const perfilCompletoAvatar =
document.getElementById("perfilCompletoAvatar");

const perfilCompletoNombre =
document.getElementById("perfilCompletoNombre");

const perfilCompletoUsuario =
document.getElementById("perfilCompletoUsuario");

const perfilCompletoBio =
document.getElementById("perfilCompletoBio");

const perfilCompletoContador =
document.getElementById("perfilCompletoContador");

const perfilCompletoPosts =
document.getElementById("perfilCompletoPosts");

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

const formularioRegistro =
document.getElementById("formularioRegistro");

const formularioLogin =
document.getElementById("formularioLogin");

const mostrarLogin =
document.getElementById("mostrarLogin");

const mostrarRegistro =
document.getElementById("mostrarRegistro");

const btnLogin =
document.getElementById("btnLogin");

const correoRegistro =
document.getElementById("correoRegistro");

const contrasenaRegistro =
document.getElementById("contrasenaRegistro");

const correoLogin =
document.getElementById("correoLogin");

const contrasenaLogin =
document.getElementById("contrasenaLogin");

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

/*
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
*/

const pantallaCarga =
document.getElementById("pantallaCarga");

const modoOscuro =
document.getElementById("modoOscuro");

const contadorPosts =
document.getElementById("contadorPosts");

const notificacion =
document.getElementById("notificacion");

const insigniaVerificada =
document.getElementById("insigniaVerificada");

const insigniaVerificadaCompleta =
document.getElementById("insigniaVerificadaCompleta");

function actualizarInsignias(){

    const esDavid =
    usuarioPerfil.textContent.trim().toLowerCase() === "@david";

    insigniaVerificada.style.display =
    esDavid ? "block" : "none";

    insigniaVerificadaCompleta.style.display =
    esDavid ? "block" : "none";
}

const contadorTexto = document.createElement("div");

contadorTexto.style.fontSize = "12px";
contadorTexto.style.color = "#666";
contadorTexto.style.marginTop = "5px";

contenido.parentNode.appendChild(contadorTexto);

let cantidadPosts = 0;

let postEditando = null;

async function configurarLikes(post, idPublicacion, usuarioId){

    const likeBtn = post.querySelector(".like-btn");
    const likesTexto = post.querySelector(".likes");

    if(!likeBtn || !likesTexto) return;

    let dioLike = false;
    let cantidadLikes = 0;

    function actualizarLikes(){

        likeBtn.textContent =
            dioLike ? "❤️ Te gusta" : "👍 Like";

        likesTexto.textContent =
            `${cantidadLikes} Likes`;

    }

    likeBtn.disabled = true;

    // Obtener Likes guardados en Supabase
    const { data: likes, error } =
        await supabaseClient
        .from("likes_publicaciones")
        .select("usuario_id")
        .eq("publicacion_id", idPublicacion);

    if(error){

        console.error("Error al cargar Likes:", error);
        likesTexto.textContent = "Error al cargar Likes";
        return;

    }

    cantidadLikes = likes.length;

    dioLike = likes.some(
        like => like.usuario_id === usuarioId
    );

    actualizarLikes();

    likeBtn.disabled = false;

    // Dar o quitar Like
    likeBtn.addEventListener("click", async () => {

        likeBtn.disabled = true;

        let errorOperacion;

        if(dioLike){

            const { error } =
                await supabaseClient
                .from("likes_publicaciones")
                .delete()
                .eq("publicacion_id", idPublicacion)
                .eq("usuario_id", usuarioId);

            errorOperacion = error;

        }else{

            const { error } =
                await supabaseClient
                .from("likes_publicaciones")
                .insert({
                    publicacion_id: idPublicacion,
                    usuario_id: usuarioId
                });

            errorOperacion = error;

        }

        if(errorOperacion){

            console.error(
                "Error al modificar Like:",
                errorOperacion
            );

            alert("No se pudo actualizar el Like.");

        }else{

            cantidadLikes += dioLike ? -1 : 1;

            dioLike = !dioLike;

            actualizarLikes();

        }

        likeBtn.disabled = false;

    });

}

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


fotoPerfil.addEventListener("change", async (e) => {

    const file = e.target.files[0];

    if (!file) {
        return;
    }

    // =========================
    // VALIDAR IMAGEN
    // =========================

    if (!file.type.startsWith("image/")) {

        alert("Selecciona un archivo de imagen válido.");
        fotoPerfil.value = "";
        return;

    }

    if (file.size > 5 * 1024 * 1024) {

        alert("La imagen no puede superar los 5 MB.");
        fotoPerfil.value = "";
        return;

    }

    // =========================
    // OBTENER USUARIO ACTUAL
    // =========================

    const { data: sesion, error: errorSesion } =
    await supabaseClient.auth.getUser();

    if (errorSesion || !sesion.user) {

        console.error(errorSesion);

        alert("Debes iniciar sesión para cambiar tu fotografía.");
        return;

    }

    const user = sesion.user;

    // =========================
    // PREPARAR IMAGEN
    // =========================

    const extension =
    file.name.split(".").pop().toLowerCase();

    const rutaImagen =
    user.id + "/" + Date.now() + "." + extension;

    // =========================
    // SUBIR IMAGEN A STORAGE
    // =========================

    const { data: imagen, error: errorImagen } =
    await supabaseClient.storage
    .from("avatars")
    .upload(rutaImagen, file, {

        contentType: file.type,
        upsert: false

    });

    if (errorImagen) {

        console.error(errorImagen);

        alert("No se pudo subir la fotografía.");

        return;

    }

    // =========================
    // OBTENER URL PÚBLICA
    // =========================

    const { data: urlImagen } =
    supabaseClient.storage
    .from("avatars")
    .getPublicUrl(imagen.path);

    const avatarUrl =
    urlImagen.publicUrl;

    // =========================
    // GUARDAR URL EN EL PERFIL
    // =========================

    const { error: errorPerfil } =
    await supabaseClient
    .from("perfiles")
    .update({

        avatar_url: avatarUrl

    })
    .eq("id", user.id);

    if (errorPerfil) {

        console.error(errorPerfil);

        alert("La imagen se subió, pero no se pudo actualizar el perfil.");

        return;

    }

    // =========================
    // ACTUALIZAR IMAGEN VISUAL
    // =========================

    avatar.src = avatarUrl;

    alert("¡Fotografía de perfil actualizada correctamente!");

    console.log("Nueva fotografía:", avatarUrl);

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


btnRegistro.addEventListener("click", async () => {

    const correo =
    correoRegistro.value.trim();

    const contrasena =
    contrasenaRegistro.value;

    // =========================
    // VALIDAR CORREO
    // =========================

    const formatoCorreo =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!formatoCorreo.test(correo)){

        alert("Escribe un correo electrónico válido.");
        return;

    }

    // =========================
    // VALIDAR CONTRASEÑA
    // =========================

    if(contrasena.length < 8){

        alert("La contraseña debe tener al menos 8 caracteres.");
        return;

    }

    // =========================
    // VALIDAR NOMBRE
    // =========================

    const nombre =
    nombreRegistro.value.trim();

    if(nombre.length < 3){

        alert("El nombre debe tener al menos 3 caracteres.");
        return;

    }

    // =========================
    // VALIDAR USUARIO
    // =========================

    const usuarioLimpio =
    usuarioRegistro.value.trim().toLowerCase();

    if(usuarioLimpio.length < 3){

        alert("El usuario debe tener al menos 3 caracteres.");
        return;

    }

    // =========================
    // CREAR CUENTA EN SUPABASE
    // =========================

    const { data, error } =
    await supabaseClient.auth.signUp({

        email: correo,
        password: contrasena

    });

    if(error){

        console.error(error);

        alert(
            "No se pudo crear la cuenta: " +
            error.message
        );

        return;

    }

    // =========================
    // GUARDAR PERFIL EN SUPABASE
    // =========================

    const { error: errorPerfil } =
    await supabaseClient
    .from("perfiles")
    .insert({

        id: data.user.id,
        nombre: nombre,
        usuario: usuarioLimpio,
        biografia: "",
        avatar_url: null,
        rol: "usuario"

    });

    if(errorPerfil){

        console.error(errorPerfil);

        alert(
            "La cuenta se creó, pero no se pudo guardar el perfil: " +
            errorPerfil.message
        );

        return;

    }

    // =========================
    // ACTUALIZAR DATOS VISUALES
    // =========================

    nombrePerfil.textContent =
    nombre;

    usuarioPerfil.textContent =
    "@" + usuarioLimpio;

    actualizarInsignias();

    // =========================
    // CUENTA CREADA
    // =========================

    console.log(
        "Usuario creado:",
        data.user
    );

    alert(
        "¡Cuenta creada correctamente! Ahora puedes iniciar sesión."
    );

    // =========================
    // CERRAR SESIÓN TEMPORAL
    // =========================

    await supabaseClient.auth.signOut();

    // =========================
    // LIMPIAR FORMULARIO
    // =========================

    nombreRegistro.value = "";
    usuarioRegistro.value = "";
    correoRegistro.value = "";
    contrasenaRegistro.value = "";
    fotoRegistro.value = "";

    previewRegistro.src =
    "defaultprofile.png";

    // =========================
    // MOSTRAR LOGIN
    // =========================

    formularioRegistro.style.display =
    "none";

    formularioLogin.style.display =
    "block";

});


guardarBio.addEventListener("click", async () => {

    const nuevaBiografia = biografiaInput.value.trim();

    if (nuevaBiografia === "") {
        return;
    }

    // Obtener el usuario actual
    const { data: { user }, error: errorUsuario } =
    await supabaseClient.auth.getUser();

    if (errorUsuario || !user) {
        alert("No se pudo identificar tu cuenta.");
        return;
    }

    // Guardar la biografía en Supabase
    const { error } = await supabaseClient
    .from("perfiles")
    .update({
        biografia: nuevaBiografia
    })
    .eq("id", user.id);

    if (error) {
        console.error(error);
        alert("No se pudo guardar la biografía.");
        return;
    }

    // Actualizar la interfaz
    biografiaPerfil.textContent = nuevaBiografia;

    biografiaInput.value = "";

    contadorBio.textContent = "0 / 160";

    contadorBio.style.color = "#666";

    alert("¡Biografía guardada correctamente!");

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

publicar.addEventListener("click", async () => {

    const { data: { user }, error: errorUsuario } =
    await supabaseClient.auth.getUser();

    if(errorUsuario || !user){

        console.error(
            "No se pudo identificar al usuario:",
            errorUsuario
        );

        return;
    }

    if(contenido.value.trim() === ""){
        return;
    }

// =========================
// GUARDAR EDICIÓN EN SUPABASE
// =========================

    if(postEditando){

        const idPublicacion =
            postEditando.dataset.id;

        const nuevoContenido =
            contenido.value.trim();

        if(!idPublicacion){
            alert("No se encontró el ID de la publicación.");
            return;
        }

        publicar.disabled = true;

        const { data: actualizada, error } =
        await supabaseClient
        .from("publicaciones")
        .update({
            contenido: nuevoContenido
        })
        .eq("id", idPublicacion)
        .eq("usuario_id", user.id)
        .select("id");

        publicar.disabled = false;

        if(error || !actualizada || actualizada.length === 0){

            console.error(
                "Error al editar publicación:",
                error
            );

            alert("No se pudo guardar la edición.");

            return;
        }

        const textoEditado =
            postEditando.querySelector("p");

        if(textoEditado){
            textoEditado.textContent = nuevoContenido;
        }

        postEditando = null;

        publicar.textContent = "Publicar";

        contenido.value = "";

        contadorTexto.textContent = "0 / 280";

        contadorTexto.style.color = "#666";

        alert("Publicación actualizada correctamente.");

        return;

    }

    if(contenido.value.trim() === ""){
        return;
    }

    // =========================
    // GUARDAR PUBLICACIÓN EN SUPABASE
    // =========================

    const { data: nuevaPublicacion, error: errorPublicacion } =
    await supabaseClient
    .from("publicaciones")
    .insert({
        usuario_id: user.id,
        contenido: contenido.value.trim()
    })
    .select()
    .single();

    if(errorPublicacion){

        console.error(
            "Error al guardar la publicación:",
            errorPublicacion
        );

        alert("No se pudo publicar. Inténtalo nuevamente.");

        return;
    }

    const post = document.createElement("div");

    post.classList.add("post");

    post.dataset.id = nuevaPublicacion.id;

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

<button class="toggle-comentarios">
    💬 Ver comentarios (0)
</button>

<div class="comentarios" style="display:none;">

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

notificacion.style.opacity = "1";

setTimeout(() => {

    notificacion.style.opacity = "0";

}, 2000);

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

configurarLikes(
    post,
    nuevaPublicacion.id,
    user.id
);

eliminarBtn.addEventListener("click", async () => {

    const confirmar =
    confirm("¿Eliminar esta publicación?");

    if(!confirmar){
        return;
    }

    eliminarBtn.disabled = true;

    const { data: eliminada, error } =
    await supabaseClient
    .from("publicaciones")
    .delete()
    .eq("id", post.dataset.id)
    .eq("usuario_id", user.id)
    .select("id");

    if(error || !eliminada || eliminada.length === 0){

        console.error(
            "Error al eliminar publicación:",
            error
        );

        alert("No se pudo eliminar la publicación.");

        eliminarBtn.disabled = false;

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

const listaComentarios =
post.querySelector(".lista-comentarios");

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

const toggleComentarios =
post.querySelector(".toggle-comentarios");

const cajaComentarios =
post.querySelector(".comentarios");

toggleComentarios.addEventListener("click", () => {

    if(cajaComentarios.style.display === "none"){

        cajaComentarios.style.display = "block";

        toggleComentarios.textContent =
        `💬 Ocultar comentarios (${cantidadComentarios})`;

    }else{

        cajaComentarios.style.display = "none";

        toggleComentarios.textContent =
        `💬 Ver comentarios (${cantidadComentarios})`;

    }

});

let cantidadComentarios = 0;

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
        
        cantidadComentarios++;

if(cajaComentarios.style.display === "none"){

    toggleComentarios.textContent =
    `💬 Ver comentarios (${cantidadComentarios})`;

}else{

    toggleComentarios.textContent =
    `💬 Ocultar comentarios (${cantidadComentarios})`;

}

        comentarioInput.value = "";

contadorComentario.textContent =
"0 / 150";

contadorComentario.style.color =
"#666";

    });

});

window.addEventListener("load", () => {

    const pantallaCarga =
    document.getElementById("pantallaCarga");

    if(!pantallaCarga) return;

    setTimeout(() => {
        pantallaCarga.style.display = "none";
    }, 800);

});

abrirPerfil.addEventListener("click", () => {

    perfilCompletoAvatar.src =
    avatar.src;

    perfilCompletoNombre.textContent =
    nombrePerfil.textContent;

    perfilCompletoUsuario.textContent =
    usuarioPerfil.textContent;

    perfilCompletoBio.textContent =
    biografiaPerfil.textContent;

    perfilCompletoContador.textContent =
    contadorPosts.textContent;

    document.querySelector(
        ".contenedor-principal"
    ).style.display = "none";

    perfilCompleto.style.display = "block";

});

volverInicio.addEventListener("click", () => {

    perfilCompleto.style.display = "none";

    document.querySelector(
        ".contenedor-principal"
    ).style.display = "flex";

});

setTimeout(() => {
    const pantallaCarga =
    document.getElementById("pantallaCarga");

    if(pantallaCarga){
        pantallaCarga.style.display = "none";
    }
}, 5000);

mostrarLogin.addEventListener("click", () => {

    formularioRegistro.style.display =
    "none";

    formularioLogin.style.display =
    "block";

});

mostrarRegistro.addEventListener("click", () => {

    formularioLogin.style.display =
    "none";

    formularioRegistro.style.display =
    "block";

});



btnLogin.addEventListener("click", async () => {

    const correo =
    correoLogin.value.trim();

    const contrasena =
    contrasenaLogin.value;

    if(correo === ""){
        alert("Escribe tu correo electrónico.");
        return;
    }

    if(contrasena === ""){
        alert("Escribe tu contraseña.");
        return;
    }

    const { data, error } =
    await supabaseClient.auth.signInWithPassword({

        email: correo,
        password: contrasena

    });

    if(error){

        console.error(error);

        alert(
            "No se pudo iniciar sesión. Revisa tu correo y contraseña."
        );

        return;

    }

    const perfilCargado =
    await cargarPerfilUsuario(data.user);

    if(!perfilCargado){

        alert(
            "Iniciaste sesión, pero no se pudieron cargar tus datos de perfil."
        );

        return;

    }

    console.log(
        "Usuario conectado:",
        data.user
    );

    alert(
        "¡Inicio de sesión correcto!"
    );

});


// =========================
// CARGAR PERFIL DEL USUARIO
// =========================

async function cargarPerfilUsuario(user){

    const { data: perfil, error } =
    await supabaseClient
    .from("perfiles")
    .select("*")
    .eq("id", user.id)
    .single();

    if(error){

        console.error(
            "Error al cargar perfil:",
            error
        );

        return false;

    }

    nombrePerfil.textContent =
    perfil.nombre;

    usuarioPerfil.textContent =
    "@" + perfil.usuario;

    biografiaPerfil.textContent =
    perfil.biografia || "Sin biografía.";

    avatar.src =
    perfil.avatar_url || "defaultprofile.png";

    actualizarInsignias();

    await cargarPublicaciones(user.id);

    registro.style.display =
    "none";

    app.style.display =
    "block";

    formularioLogin.style.display =
    "none";

    formularioRegistro.style.display =
    "block";

    return true;

}


// =========================
// RESTAURAR SESIÓN AL ABRIR FLUX
// =========================

async function restaurarSesion(){

    const { data, error } =
    await supabaseClient.auth.getSession();

    if(error){

        console.error(
            "Error al recuperar la sesión:",
            error
        );

        return;

    }


    if(data.session){

        console.log(
            "Sesión recuperada:",
            data.session.user
        );

        const perfilCargado =
        await cargarPerfilUsuario(data.session.user);

        if(!perfilCargado){

            console.error(
                "No se pudo recuperar el perfil de la sesión."
            );

        }

    }

}

// =========================
// CARGAR PUBLICACIONES DESDE SUPABASE
// =========================

async function cargarPublicaciones(usuarioActualId){

    const { data: publicaciones, error } =
    await supabaseClient
    .from("publicaciones")
    .select("*")
    .order("creado_en", { ascending: false });

    if(error){

        console.error(
            "Error al cargar publicaciones:",
            error
        );

        return;
    }

    // =========================
    // OBTENER PERFILES DE LOS AUTORES
    // =========================

    const idsAutores = [
        ...new Set(
            publicaciones.map(
                publicacion => publicacion.usuario_id
            )
        )
    ];

    let perfilesAutores = [];

    if(idsAutores.length > 0){

        const { data: perfiles, error: errorPerfiles } =
        await supabaseClient
        .from("perfiles")
        .select("id, nombre, usuario, avatar_url")
        .in("id", idsAutores);

        if(errorPerfiles){

            console.error(
                "Error al cargar perfiles:",
                errorPerfiles
            );

        }else{

            perfilesAutores = perfiles || [];

        }

    }

    const mapaPerfiles = new Map(
        perfilesAutores.map(perfil => [
            perfil.id,
            perfil
        ])
    );

    // Limpiar el feed antes de cargar
    feed.innerHTML = "";

    // Mostrar las publicaciones guardadas
    publicaciones.forEach(publicacion => {

        const autor = mapaPerfiles.get(
            publicacion.usuario_id
        );

        const nombreAutor =
            autor?.nombre || "Usuario";

        const usuarioAutor =
            autor?.usuario || "";

        const avatarAutor =
            autor?.avatar_url || "defaultprofile.png";

        const esMiPublicacion =
            publicacion.usuario_id === usuarioActualId;

        const post = document.createElement("div");

        post.classList.add("post");

        post.innerHTML = `
            <div class="autor-post">

                <img
                    class="avatar-post"
                    alt="Foto de perfil"
                >

                <div>
                    <h3 class="nombre-autor-post"></h3>
                    <small class="usuario-autor-post"></small>
                </div>

            </div>

            <p></p>

            <small class="fecha-post">
                ${obtenerTiempoRelativo(
                    new Date(publicacion.creado_en)
                )}
            </small>

            <hr>

            <button class="like-btn">
                👍 Like
            </button>

            <span class="likes">
                0 Likes
            </span>

            <br>

            ${
                esMiPublicacion
                ? `
                    <button class="editar-post">
                        ✏ Editar
                    </button>

                    <button class="eliminar-post">
                        🗑 Eliminar
                    </button>
                `
                : ""
            }

            <button class="toggle-comentarios">
                💬 Ver comentarios (0)
            </button>

            <div class="comentarios" style="display:none;">

                <input
                    type="text"
                    class="comentario-input"
                    maxlength="150"
                    placeholder="Escribe un comentario"
                >

                <div class="contador-comentario">
                    0 / 150
                </div>

                <button class="comentar-btn">
                    Comentar
                </button>

                <div class="lista-comentarios"></div>

            </div>

        `;

                post.dataset.id = publicacion.id;

        post.querySelector(".avatar-post").src =
            avatarAutor;

        post.querySelector(".nombre-autor-post").textContent =
            nombreAutor;

        post.querySelector(".usuario-autor-post").textContent =
            usuarioAutor ? `@${usuarioAutor.replace(/^@/, "")}` : "";

        post.querySelector("p").textContent =
        publicacion.contenido;

// =========================
// ELIMINAR PUBLICACIÓN
// =========================

        if(esMiPublicacion){

            const eliminarBtn =
                post.querySelector(".eliminar-post");

            eliminarBtn.addEventListener("click", async () => {

                const confirmar =
                    confirm("¿Eliminar esta publicación?");

                if(!confirmar){
                    return;
                }

                eliminarBtn.disabled = true;

                const { data: eliminada, error } =
                await supabaseClient
                .from("publicaciones")
                .delete()
                .eq("id", publicacion.id)
                .eq("usuario_id", usuarioActualId)
                .select("id");

                if(error || !eliminada || eliminada.length === 0){

                    console.error(
                        "Error al eliminar publicación:",
                        error
                    );

                    alert("No se pudo eliminar la publicación.");

                    eliminarBtn.disabled = false;

                    return;
                }

                post.remove();

                cantidadPosts--;

                contadorPosts.textContent =
                    `Publicaciones: ${cantidadPosts}`;

            });

        }

// =========================
// BOTÓN EDITAR PUBLICACIÓN
// =========================

        if(esMiPublicacion){

            const editarBtn =
                post.querySelector(".editar-post");

            editarBtn.addEventListener("click", () => {

                const textoPost =
                    post.querySelector("p");

                if(!textoPost){
                    return;
                }

                contenido.value =
                    textoPost.textContent;

                postEditando = post;

                publicar.textContent =
                    "Guardar cambios";

                contadorTexto.textContent =
                    `${contenido.value.length} / 280`;

                contenido.focus();

            });

        }

        feed.appendChild(post);

        configurarLikes(
    post,
    publicacion.id,
    usuarioActualId
);

    });

    cantidadPosts = publicaciones.length;

    contadorPosts.textContent =
    `Publicaciones: ${cantidadPosts}`;

}



// =========================
// EJECUTAR AL ABRIR FLUX
// =========================

restaurarSesion();


// =========================
// CERRAR SESIÓN
// =========================

const btnCerrarSesion =
document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", async () => {

    const { error } =
    await supabaseClient.auth.signOut();

    if (error) {

        console.error(error);

        alert("No se pudo cerrar la sesión.");

        return;
    }

    // Ocultar Flux
    app.style.display = "none";

    // Mostrar pantalla de acceso
    registro.style.display = "block";

    formularioLogin.style.display = "block";

    formularioRegistro.style.display = "none";

    // Limpiar campos de acceso
    correoLogin.value = "";
    contrasenaLogin.value = "";

    // Volver a la pantalla principal
    perfilCompleto.style.display = "none";

});

