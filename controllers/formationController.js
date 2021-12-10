let Formation = require("../models/formationModel");

let formationList = [];

let panier = [];

let achat = []

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'final'
});
    connection.connect(function(error) {if (error) console.log(error); });  
    


connection.query("select * from finalfinal;", function(err, result) {
    if (err) console.log(err);
    result.forEach(element => {
    let formation = new Formation(element.id, element.nom, element.prix, element.debut, element.fin)
    formationList.push(formation);
    })
});


exports.formationList = function(req, res){
    let connected ="";
    if(req.session.username != undefined){
        connected = "hello " + req.session.username;
    }

    res.render('formationList.ejs', {formations : formationList ,connected:connected});
}

exports.formationPanier = function(req, res){
    res.render('Panier.ejs', {panier : panier})
}

exports.formationAdd = function(req, res){
    let i = req.params.i

    if (panier.includes(formationList[i])) {
        res.render('formationListmodif.ejs', {formations : formationList})
    }
    else {
    panier.push(formationList[i]);
    console.log(panier);
    res.redirect('/formation');
    }
}

exports.formationRemove = function(req, res){
    let i = req.params.i
    panier.splice(i,1);
    res.redirect('/formation/panier')

}

exports.formationConnect = function(req, res){
    res.render('connexion.ejs')
}

exports.formationLogin= function(req, res){
    if (req.session.username != undefined){
        connected = "vous etes deja connecté"
        res.render('formationList.ejs', {formations : formationList,connected:connected})
    }
    
    else {
    req.session.username = req.body.username;
    console.log(req.session);
    res.redirect('/formation')
    }
}

exports.formationLoginIfpanier= function(req, res){
    req.session.username = req.body.username;
    panier.forEach(element => {
        let ajouter = {"idachat": element.id, "username":req.session.username}
        connection.query("INSERT INTO final2 SET ?", ajouter, function(err,result){
            if (err) console.log(err)
           

        });

    })
    let ajouterrien = {"idachat": "", "username":""}
        connection.query("INSERT INTO final2 SET ?", ajouterrien, function(err,result){
            if (err) console.log(err)
           

        });
    res.send("Merci pour votre achat ! " + req.session.username);
}


exports.formationConnecterIfpanier= function(req, res){
    res.render('connexionifpanier.ejs')
}

exports.formationFinalise = function(req, res){
    if (req.session.username ==undefined){
        res.redirect("/formation/connecterifpanier")
    }
    else{
        panier.forEach(element => {
            let ajouter = {"idachat": element.id, "username":req.session.username}
            connection.query("INSERT INTO final2 SET ?", ajouter, function(err,result){
                if (err) console.log(err)
               

            });

        })
        let ajouterrien = {"idachat": "", "username":""}
            connection.query("INSERT INTO final2 SET ?", ajouterrien, function(err,result){
                if (err) console.log(err)
               

            });
        res.send("Merci pour votre achat ! " + req.session.username);
    }
    
    
}



