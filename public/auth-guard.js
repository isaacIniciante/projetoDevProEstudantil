firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        //console.log(user.uid);
        window.location.href = '../index.html'
    }
});