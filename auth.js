
var firebaseConfig = {
    apiKey: "AIzaSyC0WOkW73igO0B2LFVKDJr7uveWPf4d4Uk",
    authDomain: "database-dispmovel.firebaseapp.com",
    databaseURL: "https://database-dispmovel-default-rtdb.firebaseio.com",
    projectId: "database-dispmovel",
    storageBucket: "database-dispmovel.firebasestorage.app",
    messagingSenderId: "245395632820",
    appId: "1:245395632820:web:2f1068109246d5d9541de1",
    measurementId: "G-2C1X826GKM"
  };
// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// ********** Função para Verificação de Autenticação e Aprovação **********
function checkAuth() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Usuário autenticado, verifica aprovação
      firebase.firestore().collection('usuarios').doc(user.uid).get()
        .then(function(doc) {
          if (doc.exists && doc.data().aprovado) {
            // Usuário aprovado, permite acesso
            console.log("Acesso permitido.");
          } else {
            // Usuário não aprovado, redireciona
            window.location.href = "aguardando_aprovacao.html";
          }
        })
        .catch(function(error) {
          console.error("Erro ao verificar aprovação: ", error);
          window.location.href = "erro.html";
        });
    } else {
      // Usuário não autenticado, redireciona para login
      window.location.href = "index.html";
    }
  });
}
