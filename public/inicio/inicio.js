
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        verTodosAlunos();
        mostrar();
        mostrarPerfil();
    } else {
        console.log("Nenhum usuário logado.");
    }
});

function mostrar() {

    var db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;

    var userRef = db.collection('alunos').doc(uid);

    userRef.get().then(function (doc) {
        if (doc.exists) {
            var nome = doc.data().nome;
            document.getElementById('hello').innerHTML = 'Olá, ' + nome;
        } else {
            console.log("O documento não existe!");
        }
    }).catch(function (error) {
        console.log("Erro ao obter o documento:", error);
    });
}

function verTodosAlunos() {
    const db = firebase.firestore();
    const div = document.getElementById('todosAlunos');
    div.innerHTML = '';
    db.collection('alunos').orderBy('nome').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (dados) {
            div.innerHTML += `
            <div class=' py-3 ml-3 perfilAmigo'  onclick="verPerfilAmigo('${dados.id}')" data-bs-toggle='modal' data-bs-target='#perfilAmigo'>
                <div class="col-12 d-flex justify-content-center">
                    <div class="img"></div>
                </div>
                <div class='col-12 text-center h6'>${dados.data().nome.split(" ")[0]}</div>
            </div>
            `;
        })
    })

}

function verPerfilAmigo(uid) {
    console.log(uid);
    const db = firebase.firestore();
    db.collection('alunos').doc(uid).get().then(doc => {
        document.getElementById('nomeAmigo').innerHTML = doc.data().nome;
        if (doc.data().zap == '' && doc.data().instagram == '' && doc.data().tiktok == '' || doc.data().tiktok == '@') {
            document.getElementById('semRede').style.display = 'block';
        }
        else {
            document.getElementById('semRede').style.display = 'none'
        }

        if (doc.data().zap == '') {
            document.getElementById('linkZap').style.display = 'none';
        }
        else {
            document.getElementById('linkZap').style.display = 'block';
            document.getElementById('linkZap').href = `https://api.whatsapp.com/send?phone=55${doc.data().zap}`;
        }

        if (doc.data().instagram == '') {
            document.getElementById('linkInsta').style.display = 'none';
        }
        else {
            document.getElementById('linkInsta').style.display = 'block';
            document.getElementById('linkInsta').href = 'https://instagram.com/' + doc.data().instagram;
        }

        if (doc.data().tiktok == '' || doc.data().tiktok == '@') {
            document.getElementById('linkTikTok').style.display = 'none';
        }
        else {
            document.getElementById('linkTikTok').style.display = 'block';
            document.getElementById('linkTikTok').href = 'https://www.tiktok.com/' + doc.data().tiktok;
        }
    })

}

function sair() {
    firebase.auth().signOut().then(() => {
        alert('Até logo...')
    }).catch((error) => {
        alert('Erro ao sair')
    });
}

function grupos() {
    window.location.href = "../grupos/grupos.html";
}

function copiarPix() {
    const textToCopy = "11970179852";
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Texto copiado com sucesso!");
}

function mostrarPerfil() {
    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;


    db.collection('alunos').doc(uid).get().then(function (doc) {
        document.getElementById('nome').value = doc.data().nome;
        document.getElementById('rgm').value = doc.data().rgm;
        if (doc.data().zap == '') {
            document.getElementById('zap').placeholder = 'Inclua o DDD. Ex: (11)91111-1111';
        }
        else if (doc.data().zap != '') {
            document.getElementById('zap').value = doc.data().zap;
        }

        if (doc.data().instagram == '') {
            document.getElementById('instagram').placeholder = 'NÃO COLOQUE @... Ex: seuperfil';
        }
        else if (doc.data().instagram != '') {
            document.getElementById('instagram').value = doc.data().instagram;
        }

        if (doc.data().tiktok == '') {
            document.getElementById('tiktok').placeholder = 'Ex: @seuperfil';
        }
        else if (doc.data().tiktok != '') {
            document.getElementById('tiktok').value = doc.data().tiktok;
        }
    })
}

const db = firebase.firestore();

function imgSelect() {
    var input = document.getElementById("foto");
    var image = document.getElementById("fotoPerfil");
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function () {
        image.style.backgroundImage = `url(${event.target.result})`;
    }

    reader.readAsDataURL(file);
}

function atualizarPerfil() {
    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;


    db.collection('alunos').doc(uid).update({
        nome: document.getElementById('nome').value,
        rgm: document.getElementById('rgm').value,
        zap: document.getElementById('zap').value,
        instagram: document.getElementById('instagram').value,
        tiktok: document.getElementById('tiktok').value,
    }).then(() => {
        alert('Perfil atualizado com sucesso');
        setTimeout(function () {
            location.reload();
        }, 1);
    }).catch(() => {
        alert('Não foi possivel atualizar o perfil')
    })
}
function adicionarArroba2() {
    const input = document.getElementById("tiktok");
    const valor = input.value;

    // Verifica se o caractere "@" já está presente
    if (!valor.includes("@")) {
        input.value = "@" + valor;
    }
}

function devs() {
    window.location.href = '../devs/devs.html';
}


function excluirConta() {
    var db = firebase.firestore();
    var admin = firebase.auth().currentUser;

    const uid = firebase.auth().currentUser.uid;

    db.collection('alunos').doc(uid).delete().then(() => {
        admin.delete(uid)
            .then(() => {
                console.log('Usuário excluído com sucesso!');
            })
            .catch((error) => {
                console.log('Erro ao excluir usuário:', error);
            });
    }).catch(() => {
        alert('erro')
    })

}


function abrirTiktok() {
    window.location.href = 'https://www.tiktok.com/@isaacdrisil?_t=8ghuiyqca3i&_r=1'
}

