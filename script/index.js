var formulario = document.getElementById('form-login')
var validacao = document.querySelector('.validacao');
var loginInput = document.getElementById('login')


formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    var formData = new FormData(formulario);
    var login;
    var senha;

    for (const entry of formData.entries()) {
        let chave = entry[0].trim();
        let valor = entry[1].trim();

        if (chave == 'login') {
            login = valor;
        }
        if (chave == 'senha') {
            senha = valor;
        }
    }


    let toastLiveExample = document.getElementById('toast-cadastro')

    if (login == '' || senha == '') {        
        let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        mudaFraseToast('Preencha os campos');
        toastBootstrap.show()
        return;
    }
    if (!localStorage.getItem(login)) {
        let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        mudaFraseToast('Usuário não encontrado');
        toastBootstrap.show()
        return;
    }
    else {
        let loginTentativa = localStorage.getItem(login);
        let loginEncontrado = JSON.parse(loginTentativa);

        if (loginEncontrado.senha == senha) {
            localStorage.setItem("logado", JSON.stringify(loginEncontrado))
            window.location.href = 'home.html'
        }
        else {
            let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            mudaFraseToast('Senha incorreta.');
            toastBootstrap.show()            
        }
    }
})

function mudaFraseToast(frase) {
    document.querySelector('.toast-body').textContent = frase;
}

function adicionaValidacao(input, textoValidacao) {
    let validacao = input.parentNode.querySelector('.validacao');
    validacao.textContent = textoValidacao;
}

loginInput.addEventListener('blur', function (event) {
    // let input = event.target;
    // let login = event.target.value;

    if (login == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
});