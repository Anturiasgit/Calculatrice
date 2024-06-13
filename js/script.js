document.addEventListener("DOMContentLoaded", function () {     // "DOMContentLoaded" nécessaire car sans lui, les fonctions sont appelés avant que le contenu intégral de la page ne termine soit chargé
    let button = document.getElementsByTagName("button");
    let res = document.getElementById("res");
    const regex = /(\d+(\.\d+)?|[-+*/])/g;
    let isResultDisplayed = false;
    let expression;     /* pour l'expression du calcul */


    /* "button" est un tableau contenant tous les boutons. La constante "regex" nous permet de transformer 
        l'expression du calcul en un tableau contenant un nombre ou un opérande dans chaque case. 
        le booléen "isResultDisplayed" est initié à "false" car au départ aucun résultat n'est affiché. 
        Il sert notament de repère pour les traitements de clique sur les boutons de suppression. */


    for (let i = 0; i < button.length; i++) {

        button[i].addEventListener(
            "click",            /*Gestion des évènements de clique*/
            function () {
                if (!isResultDisplayed){
                    if(button[i].value != "effacer" && button[i].value != "effacer_tout"){
                       res.innerHTML += button[i].value;        /* Transcrit la valeur du bouton dans la div du résultat */
                       if (button[i].value == "=") {
                           expression = res.textContent.trim().match(regex);        /* "trim" pour enlever les espaces inutiles et match(regex) pour transformer la chaîne de caractère "expression" en un tableau */
                           resultat = calcul(expression);       /* "resultat" est du type "number" */
                           res.innerHTML += resultat;          
                           isResultDisplayed = true;
                       }
                   } else if (button[i].value == "effacer") {
                       res.innerHTML = res.textContent.trim().slice(0, -1);     /* "slice" renvoie la chaîne de caractère privé de son dernier élément */
                   } else if (button[i].value == "effacer_tout"){
                       res.innerHTML = "";
                   }
               } else if (button[i].value == "effacer_tout"){
                   res.innerHTML = "";
                   isResultDisplayed = false;
               }
            });
    }
});


/* Fonctions qui traitent les calculs :
avec une fonction principale "calcul" qui reçoit l'expression 
et fait appel aux fonctions concernées selon le type d'opérande 
rencontrée durant le traitement de l'expression. */

function multiplier(num1, num2) {
    return num1 * num2;
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);     // parseFloat nécessaire car évite au caractère "+" de traiter "num1" et "num2" comme deux chaînes de caractères à concaténer mais bien comme des nombres à additionner 
}

function soustraire(num1, num2) {
    return num1 - num2;
}

function diviser(num1, num2) {
    return num1 / num2;
}

function calcul(tab) {
    let tab2 = [];

    if (tab.length == 1) {
        return tab[0];
    }




    if(!Number(tab[1])) {
   
        switch (tab[1]) {       // "tab[0] étant un nombre, on se focalise sur la valeur de tab[1]" 
        case '+':
            if (tab[3] != '*' && tab[3] != '/') {       // Gestion des priorités de calcul en vérifiant si l'opérande qui suit est prioritaire ou non 
                tab2.push(add(tab[0], tab[2]));     // Appel de la fonction d'addition sur les opérateurs concernés et ajout du résultat dans un nouveau tableau : "tab2" 
                tab = tab.slice(3);     // Mise à jour du tableau inital (sans l'expression qui vient d'être calculée) 
                tab2 = tab2.concat(tab);        // Concaténation du nouveau tableau avec le tableau initial afin de poursuivre le traitement du résultat 
            } else {
                tab2 = tab2.concat(tab.slice(0, 2));
                tab2 = tab2.concat(calcul(tab.slice(2)));       // Si l'opérande qui suit est prioritaire sur l'addition, on prend les 2 premiers éléments du tableau initial pour les ajouter au nouveau tableau, et on laisse le reste être traité de nouveau par la fonction 
            }
            break;
        case '-':       // Le procédé est le même que pour l'addition 
            if (tab[3] != '*' && tab[3] != '/') {       
                tab2.push(soustraire(tab[0], tab[2]));      
                tab = tab.slice(3);     
                tab2 = tab2.concat(tab);        
            } else {
                tab2 = tab2.concat(tab.slice(0, 2));
                tab2 = tab2.concat(calcul(tab.slice(2)));      
            }
            break;
        case '*':       // Procédé similaire à l'addition et à la soustraction, sans vérification de la priorité car la multiplication est prioritaire 
            tab2.push(multiplier(tab[0], tab[2]));      
            tab = tab.slice(3);   
            tab2 = tab2.concat(tab);
            break;
        case '/':       // Procédé similaire à la multiplication, avec vérification de la division par 0 
            if (tab[2] == 0) {
                tab2[0] = "Division par 0 impossible";
            } else {
                tab2.push(diviser(tab[0], tab[2]));
                tab = tab.slice(3);
                tab2 = tab2.concat(tab);
            }
            break;
        default:
        // Aucune action nécessaire ici
        break;
    } 
    } else if(Number(tab[1])&&tab[0] == '-'){
        tab.unshift(0);
        return calcul(tab);
    }

    if (tab2.length > 1) {      // Si le tableau nouvellement formé contient plus d'une case, c'est que les calculs ne sont pas terminés, alors on rappelle la fonction sur ce tableau
        return calcul(tab2);
    }
    else {
        return tab2[0];     // Dans le cas où le tableau ne contient qu'une seule case, son élement (un "number") peut être retourné comme résultat final     
    }

}
