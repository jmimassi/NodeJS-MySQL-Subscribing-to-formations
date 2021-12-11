let express = require('express');

let router = express.Router();

let formationController = require("./controllers/formationController");
//listes des routes vers les contrôleurs

router.get('/', (req, res) => {
    res.redirect("/formation");
});

router.get('/formation/add/formation/panier', (req, res) => {
    res.redirect("/formation/panier");
});

router.get('/formation', formationController.formationList);

router.get('/formation/panier', formationController.formationPanier);

router.get("/formation/add/:i", formationController.formationAdd);

router.get('/formation/remove/:i', formationController.formationRemove);

router.get('/formation/connecter', formationController.formationConnect);

router.post('/login', formationController.formationLogin)

router.get("/formation/finalise", formationController.formationFinalise)

router.get('/formation/connecterifpanier', formationController.formationConnecterIfpanier)

router.post('/loginifpanier', formationController.formationLoginIfpanier)

router.get("/formation/final", formationController.formationFinal)



module.exports = router;

// -server.js trivial on déclare juste les routes en gros copier d'ici
// -d'abord on crée une classe dans laquelle on mettra ce qu'on a besoin = le Model
// -puis on crée une route avec celle ci, avec le bon path puis le nom des méthdoe
// -les méthodes seront crée dans le controller = le Controller
// -dans le controller c'est ici qu'on écrit tout et c'est ici qu'on importe si besoin les vues ex : les forms, l'interface de chaque page
// etc dans un res.render

// astuce commencer par les views et refléchir par rapport a eux en mettant des paths dans les views 
// ensuite on crée les routes pour chaque path et puis une fois fait un fait les controller
// astuce les controlleres définissent le nom de listes par exemple pour les views, c'est eux qui décident