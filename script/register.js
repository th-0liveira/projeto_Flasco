var formulario = document.querySelector('#form-registro')

var nomeCompletoInput = document.getElementById('nome-completo');
var cpfInput = document.getElementById('cpf');
var telefoneInput = document.getElementById('telefone');
var celularInput = document.getElementById('celular');
var dataNascimentoInput = document.getElementById('data-nascimento');
var generoInput = document.getElementById('genero');
var nomeMaternoInput = document.getElementById('nome-materno');
var enderecoInput = document.getElementById('endereco');
var loginInput = document.getElementById('login');
var senhaInput = document.getElementById('senha');
var confirmaSenhaInput = document.getElementById('confirma-senha');

var botaoCadastrar = document.getElementById('botao-cadastro')

formulario.addEventListener('submit', (event) => {
    event.preventDefault()

    var formData = new FormData(formulario);
    var usuario = {};

    for (const entry of formData.entries()) {
        var chave = entry[0];
        var valor = entry[1];

        valor = valor.trim();

        usuario[chave] = valor;
    }

    if (existemCamposVazios()) {
        let toastLiveExample = document.getElementById('toast-cadastro')
        let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        mudaFraseToast('Preencha os campos vazios')
        toastBootstrap.show()
        return;
    };

    if (!camposValidos()) {
        let toastLiveExample = document.getElementById('toast-cadastro')
        let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        mudaFraseToast('Preencha os campos corretamente')
        toastBootstrap.show()
        return;
    }
    else {
        adicionarUsuario(usuario)
    }
})

function mudaFraseToast(frase) {
    document.querySelector('.toast-body').textContent = frase;
}

function existemCamposVazios() {
    const inputs = document.querySelectorAll('form input');

    var existeCampoVazio;

    inputs.forEach(x => {
        if (!x.value || x.value == "") {
            existeCampoVazio = true;
        }
        else {
            existeCampoVazio = false;
        }
    })
    return existeCampoVazio;
}

function camposValidos() {
    let validacoes = document.querySelectorAll('.validacao');
    let validos = true;

    validacoes.forEach(element => {

        if (element.textContent.trim() !== "") {
            validos = false;
        }
    });

    return validos;
}

function adicionarUsuario(usuario) {
    let toastLiveExample = document.getElementById('toast-cadastro')
    let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    let frase;
    if (!localStorage.getItem(usuario.login)) {
        frase = 'Usuário criado com sucesso. Redirecionando...';
        localStorage.setItem(usuario.login, JSON.stringify(usuario));
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 2000);

        

    } else {
        frase = 'Login já existe. Não foi possível adicionar o usuário.';
    }
    mudaFraseToast(frase);
    toastBootstrap.show();
}

function adicionaValidacao(input, textoValidacao) {
    let validacao = input.parentNode.querySelector('.validacao');
    validacao.textContent = textoValidacao;
}

nomeCompletoInput.addEventListener('blur', function (event) {
    let input = event.target;
    let nome = event.target.value;

    const regex = /[0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

    if (nome.length == 0) {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
    else if (nome.length < 14 || nome.length > 59) {
        adicionaValidacao(input, 'Nome deve conter de 15 a 60 letras.')
    } else if (regex.test(nome)) {
        adicionaValidacao(input, 'Nome deve conter apenas letras.')
    } else {
        adicionaValidacao(input, '')
    }
});

cpfInput.addEventListener('input', function (event) {
    let input = event.target;
    let cpf = event.target.value;

    const regex = /[A-Za-z]/;

    if (cpf.length == 0) {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
    else if (regex.test(cpf)) {
        adicionaValidacao(input, 'CPF não pode deve conter letras.')
    }
    else {
        adicionaValidacao(input, new String());
    }
});


telefoneInput.addEventListener('input', function (event) {
    let input = event.target;
    let telefone = event.target.value;

    if (telefone == "") {
        adicionaValidacao(input, 'Campo obrigatório.')

    }
    else {
        adicionaValidacao(input, new String());
        mascaraTelefone(event.target)
    }
});

function mascaraTelefone(campo) {
    campo.value = campo.value.replace(/\D/g, '');
    var numero = campo.value;

    if (numero.length <= 2) {
        campo.value = "(+55)";
    } else if (numero.length <= 4) {
        campo.value = "(+55)" + numero.substring(2);
    } else if (numero.length <= 12) {
        campo.value = "(+55)" + numero.substring(2, 4) + "-" + numero.substring(4);
    } else {
        campo.value = "(+55)" + numero.substring(2, 4) + "-" + numero.substring(4, 12);
    }
}


celularInput.addEventListener('input', function (event) {
    let input = event.target;
    let celular = event.target.value;

    if (celular == "") {
        adicionaValidacao(input, 'Campo obrigatório.')

    }
    else {
        adicionaValidacao(input, new String());
        mascaraCelular(event.target)
    }
});

function mascaraCelular(campo) {
    campo.value = campo.value.replace(/\D/g, '');
    var numero = campo.value;

    if (numero.length <= 2) {
        campo.value = "(+55)";
    } else if (numero.length <= 4) {
        campo.value = "(+55)" + numero.substring(2);
    } else if (numero.length <= 13) {
        campo.value = "(+55)" + numero.substring(2, 4) + "-" + numero.substring(4);
    } else {
        campo.value = "(+55)" + numero.substring(2, 4) + "-" + numero.substring(4, 12);
    }
}

dataNascimentoInput.addEventListener('blur', function (event) {
    let input = event.target;
    let nascimento = event.target.value;

    if (nascimento == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
    else {
        adicionaValidacao(input, new String());
    }
});

generoInput.addEventListener('blur', function (event) {
    let input = event.target;
    let genero = event.target.value;

    if (genero == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    } else {
        adicionaValidacao(input, new String());
    }
});

nomeMaternoInput.addEventListener('blur', function (event) {
    let input = event.target;
    let materno = event.target.value;

    const regex = /[0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

    if (materno == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
    else if (regex.test(materno)) {
        adicionaValidacao(input, 'O nome deve conter apenas letras.')
    } else {
        adicionaValidacao(input, new String());
    }

});

enderecoInput.addEventListener('blur', function (event) {
    if (login == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
});

loginInput.addEventListener('blur', function (event) {
    let input = event.target;
    let login = event.target.value;

    const regex = /[0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

    if (login == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
    else if (regex.test(login)) {
        adicionaValidacao(input, 'Login deve ter apenas letras.');
    }
    else if (login.length != 6) {
        adicionaValidacao(input, 'Login deve ter 6 letras.');
    }
    else {
        adicionaValidacao(input, new String());
    }

});

senhaInput.addEventListener('blur', function (event) {
    let input = event.target;
    let senha = event.target.value;
    const regex = /[0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;


    if (senha == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
    else if (regex.test(senha)) {
        adicionaValidacao(input, 'Senha deve ter apenas letras.');
    }
    else if (senha.length != 8) {
        adicionaValidacao(input, 'Senha deve ter 8 caracteres.');
    }
    else {
        adicionaValidacao(input, new String());
    }
});

confirmaSenhaInput.addEventListener('blur', function (event) {
    let input = event.target;
    let confirmaSenha = event.target.value;
    let senha = document.getElementById('senha').value;

    if (confirmaSenha == "") {
        adicionaValidacao(input, 'Campo obrigatório.')
    }
    else if (senha != confirmaSenha) {
        adicionaValidacao(input, 'As senhas são diferentes.')
    }
    else {
        adicionaValidacao(input, '')
    }

});
