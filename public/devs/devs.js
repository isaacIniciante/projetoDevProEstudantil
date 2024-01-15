let a = 0;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        mostrarPerfil();
        if(/*ISAAC*/user.uid =='6f2TkeyIzcS9psyO5hJhvWtxf7Z2' || /*JHONATAN*/ user.uid=='uWis1Eu82AU9PLqeiivxGUXvEpG2'/*OUTROS ADMINS*/){
            document.getElementById('subirVideo').style.display = 'block';
            a = 1;
        }
    } else {
        console.log("Nenhum usuário logado.");
    }
});

function sair() {
    firebase.auth().signOut().then(() => {
        alert('Até logo...')
    }).catch((error) => {
        alert('Erro ao sair')
    });
}

function inicio() {
    window.location.href = '../inicio/inicio.html'
}
function grupos() {
    window.location.href = "../grupos/grupos.html";
}

function adicionarArroba2(){
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

function mostrarPerfil() {
    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;


    db.collection('alunos').doc(uid).get().then(function (doc) {
        document.getElementById('nome').value = doc.data().nome;
        document.getElementById('rgm').value = doc.data().rgm;
        if(doc.data().zap == ''){
            document.getElementById('zap').placeholder = 'Inclua o DDD. Ex: (11)91111-1111';
        }
        else if(doc.data().zap != ''){
            document.getElementById('zap').value = doc.data().zap;
        }

        if(doc.data().instagram == ''){
            document.getElementById('instagram').placeholder = 'NÃO COLOQUE @... Ex: seuperfil';
        }
        else if(doc.data().instagram != ''){
            document.getElementById('instagram').value = doc.data().instagram;
        }

        if(doc.data().tiktok == ''){
            document.getElementById('tiktok').placeholder = 'Ex: @seuperfil';
        }
        else if(doc.data().tiktok != ''){
            document.getElementById('tiktok').value = doc.data().tiktok;
        }
    })
}

function atualizarPerfil() {
    showLoading();
    var db = firebase.firestore();

    const uid = firebase.auth().currentUser.uid;

    db.collection('alunos').doc(uid).update({
        nome: document.getElementById('nome').value,
        rgm: document.getElementById('rgm').value,
        zap: document.getElementById('zap').value,
        instagram: document.getElementById('instagram').value,
        tiktok: document.getElementById('tiktok').value,
    }).then(() => {
        hideLoading()
        alert('Perfil atualizado com sucesso');
        setTimeout(function () {
            location.reload();
        }, 1);
    }).catch(() => {
        hideLoading();
        alert('Não foi possivel atualizar o perfil')
    })
}

function abrirTiktok(){
    window.location.href='https://www.tiktok.com/@isaacdrisil?_t=8ghuiyqca3i&_r=1'
}


function publicarVideo(){
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    if(!document.getElementById('frameVideo').value || !document.getElementById('tituloVideo').value || document.getElementById('referente').value==''){
        alert('Preencha os itens obrigatórios *');
    }
    else{
        showLoading();
        db.collection('alunos').doc(uid).get().then(doc=>{
            db.collection(`${document.getElementById('referente').value}`).doc().set({
                autor: doc.data().nome,
                uidAutor: doc.id,
                frame: document.getElementById('frameVideo').value,
                titulo: document.getElementById('tituloVideo').value,
                descricao: document.getElementById('descricaoVideo').value
            }).then(()=>{
                hideLoading();
                alert('Vídeo postado com sucesso!');
                window.location.reload();
            }).catch(error=>{
                hideLoading();
                alert('Erro ao postar vídeo');
                console.log(error);
            })
        })
    }
}

videosDisponiveis();
function videosDisponiveis(){
    let vJavascript = 0;
    let vJava = 0;
    let vPython = 0;
    let vPhp = 0;
    let vHtml = 0;
    let vCss = 0;
    let vBootstrap = 0;
    let vFirebase = 0;
    let vOracle = 0;
    let vMysql = 0;
    let vSqlite = 0;
    const db = firebase.firestore();
    db.collection('javascript').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vJavascript = vJavascript + 1;
            document.getElementById('vJavascript').innerHTML = `JAVASCRIPT - ${vJavascript} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('java').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vJava = vJava + 1;
            document.getElementById('vJava').innerHTML = `JAVA - ${vJava} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('python').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vPython = vPython + 1;
            document.getElementById('vPython').innerHTML = `PYTHON - ${vPython} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('php').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vPhp = vPhp + 1;
            document.getElementById('vPhp').innerHTML = `PHP - ${vPhp} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('html').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vHtml = vHtml + 1;
            document.getElementById('vHtml').innerHTML = `HTML - ${vHtml} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('css').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vCss = vCss + 1;
            document.getElementById('vCss').innerHTML = `CSS - ${vCss} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })


    db.collection('bootstrap').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vBootstrap = vBootstrap + 1;
            document.getElementById('vBootstrap').innerHTML = `BOOTSTRAP - ${vBootstrap} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('firebase').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vFirebase = vFirebase + 1;
            document.getElementById('vFirebase').innerHTML = `FIREBASE - ${vFirebase} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('oracle').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vOracle = vOracle + 1;
            document.getElementById('vOracle').innerHTML = `ORACLE - ${vOracle} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('mysql').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vMysql = vMysql + 1;
            document.getElementById('vMysql').innerHTML = `MYSQL - ${vMysql} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

    db.collection('sqlite').get().then(function(querySnapShot){
        querySnapShot.forEach(function(doc){
            vSqlite = vSqlite + 1;
            document.getElementById('vSqlite').innerHTML = `SQLITE - ${vSqlite} - Postado`
        })
    }).catch(()=>{
        console.log('erro')
    })

}

function fecharPlace(){
    document.getElementById('videosPlace').style.display = 'none'
}



function fecharVideo(){
    const p = confirm('Fechar video?')
    if(p){
        window.location.reload();
    }
}

function verPerfilAmigo(uid){
    console.log(uid);
    const db = firebase.firestore();
    db.collection('alunos').doc(uid).get().then(doc=>{
        document.getElementById('nomeAmigo').innerHTML = doc.data().nome;
        if(doc.data().zap=='' && doc.data().instagram=='' && doc.data().tiktok=='' || doc.data().tiktok=='@'){
            document.getElementById('semRede').style.display = 'block';
        }
        else{
            document.getElementById('semRede').style.display = 'none'
        }

        if(doc.data().zap==''){
            document.getElementById('linkZap').style.display = 'none';
        }
        else{
            document.getElementById('linkZap').style.display = 'block';
            document.getElementById('linkZap').href = `https://api.whatsapp.com/send?phone=55${doc.data().zap}`;
        }

        if(doc.data().instagram==''){
            document.getElementById('linkInsta').style.display = 'none';
        }
        else{
            document.getElementById('linkInsta').style.display = 'block';
            document.getElementById('linkInsta').href = 'https://instagram.com/'+doc.data().instagram;
        }

        if(doc.data().tiktok=='' || doc.data().tiktok=='@'){
            document.getElementById('linkTikTok').style.display = 'none';
        }
        else{
            document.getElementById('linkTikTok').style.display = 'block';
            document.getElementById('linkTikTok').href = 'https://www.tiktok.com/'+doc.data().tiktok;
        }
    })
}

function apagarVideo(uid){
    const db = firebase.firestore();
    const p = confirm('Certeza que deseja excluir este vídeo?')
    if(p){
        showLoading();
        db.collection(document.getElementById('filtrar').value).doc(uid).delete().then(()=>{
            alert('Vídeo excluido com sucesso.')
            window.location.reload();
            hideLoading();
        })
        .catch((error)=>{
            hideLoading();
            alert('Algo deu errado...')
            console.log(error);
        })
    }
}

function verVideo(uid){
    document.getElementById('videosPlace').style.display = 'block'
    const div = document.getElementById('videoPrincipal');
    const div2 = document.getElementById('todosVideosSobre');
    div2.innerHTML = '';
    div.innerHTML = '';
    const db = firebase.firestore();
    db.collection(document.getElementById('filtrar').value).doc(uid).get().then(doc=>{
        db.collection('alunos').doc(doc.data().uidAutor).get().then(dados=>{
            div.innerHTML = `
            <div class='col-12 py-4 bg-white'>
                <div class='embed-responsive embed-responsive-21by9'>
                    <iframe class='embed-responsive-item' src="https://www.youtube.com/embed/${doc.data().frame}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div class='border'>
                    <label class='col-12 text-left h6'><b>${doc.data().titulo}</b></label>
                </div>
                <div class='border'>
                    <label class='col-12 text-left h6'>${doc.data().descricao}</label>
                </div>
                <div class='border py-2'>
                    <label class='col-12 text-left h6'>publicado por: <b>${doc.data().autor}</b></label>
                    <div class='d-flex justify-content-between'>
                        <a class='col-4' href='https://api.whatsapp.com/send?phone=55${dados.data().zap}'><button class='col-12 btn btn-success'><i class='bi bi-whatsapp'></i></button></a>
                        <a class='col-4' href='https://instagram.com/${dados.data().instagram}'><button class='col-12 btn btn-white'><i class='bi bi-instagram'></i></button></a>
                        <a class='col-4' href='https://www.tiktok.com/${dados.data().tiktok}'><button class='col-12 btn btn-dark'><i class='bi bi-tiktok'></i></button></a>
                    </div>
                    <button class='col-12 btn btn-danger mt-2' id='apagarVideo' onclick="apagarVideo('${doc.id}')">Apagar vídeo</button>
                </div>
            </div>  
        `;
        if(a==1){
            document.getElementById('apagarVideo').style.display = 'block';
        }
        else{
            document.getElementById('apagarVideo').style.display = 'none';
        }
        }).catch(error=>{
            console.log(error);
        })   
    }).catch(error=>{
        console.log(error);
    });


    db.collection(document.getElementById('filtrar').value).doc(uid).get().then((frame)=>{
        db.collection(document.getElementById('filtrar').value).where('frame','!=',frame.data().frame).get().then(function(querySnapShot){
            querySnapShot.forEach(function(doc){
                div2.innerHTML += `
                <div class='col-12 d-flex mt-4 text-dark' id='verVideoAtual' onclick="verVideo('${doc.id}')">
                    <div class='col-5 embed-responsive embed-responsive-21by9'>
                        <iframe class='embed-responsive-item' src="https://www.youtube.com/embed/${doc.data().frame}" style='pointer-events:none' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div class='col-7'>
                            <div class='col-12 text-left' style='font-size:10pt'>
                                <b>${doc.data().titulo}</b>
                            </div>
                            <div class='col-12 text-left' style='font-size:10pt'>
                                publicado por: ${doc.data().autor}
                            </div>
                    </div>
                </div>
            `;
            })
        })
    })
}

const db = firebase.firestore();
function filtrar(){
    const videos = document.getElementById('videos');
    videos.innerHTML = '';
    const filtrar = document.getElementById('filtrar').value;

    db.collection(filtrar).get().then(function(querySnapShot){
        querySnapShot.forEach(function(dados){
                videos.innerHTML += `
                    <div class='col-12 col-md-4 border mt-5 border-dark py-4 bg-white medida' id='verVideo' onclick="verVideo('${dados.id}')">
                        <div class='embed-responsive embed-responsive-21by9'>
                            <iframe class='embed-responsive-item' src="https://www.youtube.com/embed/${dados.data().frame}" style='pointer-events:none' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div class='border border-dark'>
                            <label class='col-12 text-left h6'><b>${dados.data().titulo}</b></label>
                        </div>
                        <div class='border border-dark py-2'>
                            <label class='col-12 text-left h6'>publicado por: <b>${dados.data().autor}</b></label>
                        </div>
                    </div>   
                `;
            
        })
    });
}

/*const db = firebase.firestore();
function pesquisar(){
    const pesquisa = document.getElementById('pesquisa').value.toUpperCase();
    const filtrar = document.getElementById('filtrar').value;

    const videos = document.getElementById('videos');

    if(pesquisa==''){
        filtrar();
    }
    else{
        db.collection(filtrar).orderBy("titulo").startAt(pesquisa).endAt(pesquisa+"\uf8ff").get().then(function(querySnapShot){
            videos.innerHTML = '';
            querySnapShot.forEach(function(dados){
                const titulo = dados.data().titulo.toUpperCase();
                if(titulo.includes(pesquisa)){
                    videos.innerHTML += `
                        <div class='col-12 col-md-4 border mt-5 border-dark py-4 bg-white medida' id='verVideo' onclick="verVideo('${dados.id}')">
                            <div class='embed-responsive embed-responsive-21by9'>
                                <iframe class='embed-responsive-item' src="https://www.youtube.com/embed/${dados.data().frame}" style='pointer-events:none' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                            <div class='border border-dark'>
                                <label class='col-12 text-left h6'><b>${dados.data().titulo}</b></label>
                            </div>
                            <div class='border border-dark py-2'>
                                <label class='col-12 text-left h6'>publicado por: <b>${dados.data().autor}</b></label>
                            </div>
                        </div>   
                    `;
                }
            })
        });
    }
}*/

/*

<button class='col-12 btn btn-info' onclick="verPerfilAmigo('${doc.data().uidAutor}')"  data-bs-toggle='modal' data-bs-target='#perfilAmigo'>${doc.data().autor}</button>
                            <button class='col-12 btn btn-danger mt-2' id='apagarVideo' onclick="apagarVideo('${doc.id}')">Apagar vídeo</button>
                if(a==1){
                    document.getElementById('apagarVideo').style.display = 'block';
                    console.log(a);
                }
                else{
                    document.getElementById('apagarVideo').style.display = 'none';
                    console.log(a);
                }
*/


