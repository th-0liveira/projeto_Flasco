var usuarioLogado = localStorage.getItem('logado');

if (!usuarioLogado || usuarioLogado == "") {
    window.location.href = 'index.html'
}