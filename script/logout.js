var localStorageLogado = localStorage.getItem('logado');

if (localStorageLogado && localStorageLogado != "") {

    var usuarioLogado = JSON.parse(localStorageLogado)
    document.getElementById('login-usuario').textContent = usuarioLogado.login;
};

var botaoDeslogar = document.getElementById('botao-logout');

botaoDeslogar.addEventListener('click', () => {
    console.log('te3');
    localStorage.removeItem('logado');
    window.location.href = 'index.html'
})