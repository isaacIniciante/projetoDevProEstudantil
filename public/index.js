window.addEventListener('scroll', function() {
    var navbar = document.getElementById('nav');
    if (window.pageYOffset > 0) {
        navbar.classList.add('sombra');
    } else {
        navbar.classList.remove('sombra');
    }
});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //console.log(user.uid);
        //window.location.href = 'inicio/inicio.html';
    }
});

function entrar() {

    if (!form.email().value || !form.senha().value) {
        alert('Digite todos os dados');
    }
    else {
        showLoading();
        firebase.auth().signInWithEmailAndPassword(form.email().value.trim(), form.senha().value)
            .then((userCredential) => {
                hideLoading();
                window.location.href = 'inicio/inicio.html'
            })
            .catch((error) => {
                hideLoading();
                alert('Algo deu errado. Verifique os dados...')
            });
    }
}

function registrar() {

    if (!form.emailCadastro().value || !form.senhaCadastro().value || !form.rgmCadastro().value || !form.confirmarSenha().value || !form.nome().value) {
        alert('Preencha todos os campos');
    }

    else if (form.senhaCadastro().value != form.confirmarSenha().value) {
        alert('Senha e confirmar senha devem ser iguais !!!');
    }

    else if (form.senhaCadastro().value.length < 6) {
        alert('Senha deve ter ao menos 6 digitos');
    }

    else {
        showLoading();
        firebase.auth().createUserWithEmailAndPassword(form.emailCadastro().value.trim(), form.senhaCadastro().value)
            .then((userCredential) => {
                var user = userCredential.user;
                var db = firebase.firestore();
                db.collection("alunos").doc(user.uid).set({
                    nome: form.nome().value,
                    rgm: form.rgmCadastro().value,
                    nomeGrupo: '',
                    zap: '',
                    instagram: '',
                    tiktok: '',
                })
                    .then(() => {
                        hideLoading();
                        alert('Seja bem-vindo')
                        window.location.href = 'inicio/inicio.html'
                    })
                    .catch((error) => {
                        hideLoading();
                        alert("algo deu errado");
                    });
            })
            .catch((error) => {
                hideLoading();
                alert(erroCadastrar(error))
                // ..
            });

    }

}

function erroCadastrar(error) {
    if (error.code == 'auth/email-already-in-use') {
        return 'E-mail já existente'
    }
    if (error.code == 'auth/invalid-email') {
        return 'E-mail inválido'
    }
}

function abrirRegistro() {
    form.divLogin().style.display = "none";
    form.divRegistro().style.display = "block";
}

function abrirEntrar() {
    form.divLogin().style.display = "block";
    form.divRegistro().style.display = "none";
}

function esqueciSenha() {
    firebase.auth().sendPasswordResetEmail(form.email().value)
        .then(() => {
            alert('Link de recuperar senha enviado para o email: \n'+form.email().value)
        })
        .catch((error) => {
            alert('Não foi possivel enviar link de recuperação\nVerifique se o Email está correto')
        });
}

const form = {

    email: () => document.getElementById("email"),
    emailCadastro: () => document.getElementById("emailCadastro"),
    rgmCadastro: () => document.getElementById("rgmCadastro"),
    senha: () => document.getElementById("senha"),
    nome: () => document.getElementById("nome"),

    senhaCadastro: () => document.getElementById("senhaCadastro"),
    confirmarSenha: () => document.getElementById("confirmarSenha"),
    divLogin: () => document.getElementById("login"),
    divRegistro: () => document.getElementById("registro"),
}