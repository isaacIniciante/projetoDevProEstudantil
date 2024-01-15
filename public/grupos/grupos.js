firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //console.log(user.uid);
        //window.location.href = 'inicio/inicio.html';
        meuGrupo();
        mostrarPerfil();
        verifGrupo();
    }
});


function inicio() {
    window.location.href = '../inicio/inicio.html'
}


function sair() {
    firebase.auth().signOut().then(() => {
        alert('Até logo...')
    }).catch((error) => {
        alert('Erro ao sair')
    });
}


function verifGrupo() {
    showLoading();
    var db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;

    db.collection('alunos').doc(uid).get().then(function (doc) {
        if (doc.data().nomeGrupo == '') {
            hideLoading();
            document.getElementById('entrarEmUmGrupo').style.display = 'block'
            document.getElementById('criarUmGrupo').style.display = 'block'
            document.getElementById('salvoGrupo').style.display = 'none'
            document.getElementById('mostrarGrupo').style.display = 'none'
        }
        else if (doc.data().nomeGrupo != '') {
            hideLoading();
            document.getElementById('entrarEmUmGrupo').style.display = 'none'
            document.getElementById('criarUmGrupo').style.display = 'none'
            document.getElementById('salvoGrupo').style.display = 'block'
            document.getElementById('mostrarGrupo').style.display = 'block'
        }
    })
}

function criarGrupo() {
    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;

    if (form.nomeGrupo().value == "" || form.numeroZap().value == "" | form.semestre().value == "") {
        alert('Preencha todos os campos')
    }
    else {
        db.collection('alunos').doc(uid).get().then(function (verifDoc) {
            if (verifDoc.data().nomeGrupo == "") {
                db.collection("grupos").add({
                    nomeGrupo: form.nomeGrupo().value,
                    semestre: form.semestre().value,
                    numeroZap: form.numeroZap().value,
                })
                    .then(function (docRef) {
                        db.collection('alunos').doc(uid).update({
                            nomeGrupo: docRef.id,
                        }).then(() => {
                            setTimeout(function () {
                                location.reload();
                            }, 1);
                            alert('Grupo criado com sucesso')
                        }).catch(() => {
                            alert('Algo deu errado')
                        })
                    })
                    .catch(function (error) {
                        alert('Erro ao criar Grupo...')
                    });
            }
            else if (verifDoc.data().nomeGrupo != "") {
                alert('Você já está em um grupo. Saia do grupo atual primeiro...')
            }
        })
    }
}

function mostrarGrupos() {
    var db = firebase.firestore();
    var gruposRef = db.collection('grupos');
    var user = firebase.auth().currentUser;

    var alunosRef = db.collection('alunos');
    const semestre = document.getElementById('semestreVer').value;
    console.log(semestre);

    if (semestre == '') {
        alert('Escolha um semestre para pesquisar os grupos')
    }
    else {
        document.getElementById('grupos').innerHTML = '';


        gruposRef.where('semestre', '==', semestre).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (grupoDoc) {
                var div = document.createElement('div');

                div.classList.add('grupos');
                div.innerHTML =
                    `
                <div class='col-12 text-center nomeGrupo'><b>${grupoDoc.data().nomeGrupo + ' - ' + grupoDoc.data().semestre + 'º Semestre'}</b></div>
                <div class='col-12 d-flex'>
                <div class='col-6 text-center'><b>NOME</b></div>
                <div class='col-6 text-center'><b>RGM</b></div>
                </div>`;



                alunosRef.where('nomeGrupo', '==', grupoDoc.id).get().then(function (alunosSnapshot) {
                    alunosSnapshot.forEach(function (alunosDoc) {


                        var row = document.createElement('div');
                        row.innerHTML = `
                    <div class='col-12 d-flex mt-2 mb-2 bg-secondary text-white' onclick="verPerfilAmigo('${alunosDoc.id}')" data-bs-toggle='modal' data-bs-target='#perfilAmigo'>
                    <div class='col-6 text-center risca'>${alunosDoc.data().nome}</div>
                    <div class='col-6 text-center risca'>${alunosDoc.data().rgm}</div>
                    </div>
                    `;
                        div.appendChild(row);
                    });
                    div.appendChild(botoes);
                });
                var botoes = document.createElement('div');
                botoes.innerHTML = `
                    <div class='d-flex'>
                        <button class='btn btn-success col-12' onclick="entrarGrupo('${grupoDoc.id}')">Entrar no grupo</button>
                    </div>`;
                document.getElementById('grupos').appendChild(div);
            });
        }).catch(function (error) {
            console.log("Erro ao obter os documentos:", error);
        });
    }
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

function devs() {
    window.location.href = '../devs/devs.html';
}

function entrarGrupo(id) {

    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;


    db.collection('alunos').doc(uid).get().then(function (verifDoc) {
        if (verifDoc.data().nomeGrupo == "") {
            db.collection('alunos').doc(uid).update({
                nomeGrupo: id,
            }).then(() => {
                setTimeout(function () {
                    location.reload();
                }, 1);
                alert('Entrou no grupo')
            }).catch(() => {
                alert('Erro')
            })
        }
        else if (verifDoc.data().nomeGrupo == id) {
            alert('Você ja está nesse grupo')
        }
        else {
            alert('Você ja está em um grupo. Saia para entrar em outro')
        }
    })
}

function meuGrupo() {
    // Obtém a instância do Firebase Authentication
    var auth = firebase.auth();

    // Obtém o usuário atual
    var user = auth.currentUser;

    // Obtém a instância do Firebase Firestore
    var db = firebase.firestore();

    // Recupera os grupos do Firestore
    db.collection("grupos").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (grupoDoc) {
            // Verifica se o usuário pertence ao grupo correspondente
            db.collection("alunos").doc(user.uid).get().then(function (doc) {
                if (doc.exists && doc.data().nomeGrupo == grupoDoc.id) {
                    // Cria um elemento HTML para o grupo
                    var div = document.createElement('div');
                    div.classList.add('grupos');
                    div.innerHTML =
                        `
                <div class='col-12 text-center nomeGrupo'><b>${grupoDoc.data().nomeGrupo + ' - ' + grupoDoc.data().semestre + 'º Semestre'}</b></div>
                <div class='col-12 d-flex'>
                <div class='col-6 text-center'><b>NOME</b></div>
                <div class='col-6 text-center'><b>RGM</b></div>
                </div>`;

                    // Recupera os alunos do grupo correspondente
                    db.collection("alunos").where("nomeGrupo", "==", grupoDoc.id).get().then(function (alunosSnapshot) {
                        alunosSnapshot.forEach(function (alunosDoc) {
                            // Adiciona as informações do aluno à div
                            var row = document.createElement('div');
                            row.innerHTML = `
                    <div class='col-12 d-flex bg-dark text-white mt-2 mb-2' onclick="verPerfilAmigo('${alunosDoc.id}')" data-bs-toggle='modal' data-bs-target='#perfilAmigo'>
                    <div class='col-6 text-center risca'>${alunosDoc.data().nome}</div>
                    <div class='col-6 text-center risca'>${alunosDoc.data().rgm}</div>
                    </div>
                    `;
                            div.appendChild(row);
                        });
                        div.appendChild(botaoZap);
                    });

                    var botaoZap = document.createElement('div');
                    botaoZap.innerHTML = `
                    <div class='d-flex'>
                        <button class='btn btn-success col-12' onclick="chamarLider('${grupoDoc.data().numeroZap}')"><i class='bi bi-whatsapp'></i> Chamar lider</button>
                    </div>`;
                    document.getElementById('meuGrupo').appendChild(div);
                }
            });
        });
    }).catch(function (error) {
        console.log("Erro ao obter os documentos:", error);
    });

}

function sairDoGrupo() {
    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;


    db.collection('alunos').doc(uid).update({
        nomeGrupo: "",
    }).then(() => {
        setTimeout(function () {
            location.reload();
        }, 1);
        alert('Saída efetuada com sucesso!')
    }).catch(() => {
        alert('Erro')
    })
}

function chamarLider(numero) {

    var phoneNumber = '+55' + numero;
    console.log(phoneNumber)

    var whatsappLink = 'https://wa.me/' + phoneNumber;

    window.location.href = whatsappLink;
}

function mostrarPerfil() {
    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;


    db.collection('alunos').doc(uid).get().then(function (doc) {
        document.getElementById('nome').value = doc.data().nome;
        document.getElementById('rgm').value = doc.data().rgm;

        if (doc.data().zap != '') {
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

function verTodosAlunos(){
    const db = firebase.firestore();
    const div = document.getElementById('todosAlunos');
    div.innerHTML = '';
    db.collection('alunos').get().then(function(querySnapshot){
        querySnapshot.forEach(function(dados){
            div.innerHTML += `
            <div class='mt-5 border border-dark py-3'>
                <div class='col-12 text-center h6'>${dados.data().nome}</div>
                <div class='col-12 text-center'>
                    <div class='row d-flex justify-content-center'>
                        <button class='col-10 btn btn-secondary' onclick="verPerfilAmigo('${dados.id}')" data-bs-toggle='modal' data-bs-target='#perfilAmigo'>Ver Perfil</button>
                    </div>
                </div>
            </div>
            `;
        })
    })
    
}

function abrirTiktok() {
    window.location.href = 'https://www.tiktok.com/@isaacdrisil?_t=8ghuiyqca3i&_r=1'
}

const form = {
    nomeGrupo: () => document.getElementById('nomeGrupo'),
    semestre: () => document.getElementById('semestre'),
    numeroZap: () => document.getElementById('numeroZap'),
}