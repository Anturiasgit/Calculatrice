document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementsByTagName("button");
    let egal = document.getElementById("egal");
    let res = document.getElementById("res");   

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener(
            "mouseover", 
            function (event) {
                event.target.style.backgroundColor = "grey";
            }
        );

        button[i].addEventListener(
            "mouseout", 
            function (event) {
                event.target.style.backgroundColor = "";
            }
        );

        button[i].addEventListener(
            "click",
            function (event) {
                event.target.style.backgroundColor = "white";
                res.textContent += button[i].textContent.trim();
                if (button[i].textContent == egal.textContent){
                    let leresultat = Array.from(res.textContent.trim());
                    while (leresultat.length > 1){
                        leresultat = resultat(leresultat);
                    }
                    res.textContent += Number(leresultat);
                }  
            }
        );
    }
});

function multiplier (num1,num2){
    return num1 * num2;
}

function add (num1,num2){
    return num1 + num2;
}

function soustraire (num1,num2){
    return num1 - num2;
}

function diviser (num1,num2){
    return num1/num2;
}

function resultat (leresultat)
{
    let tab = leresultat;
    let tab2 = [];
    
    for (let i=0;i<tab.length;i++){

        if (tab[i+1]=='/'){
            tab2.push(diviser(tab[i],tab[i+2]));
            tab2.push(tab[i+3]);
        }

        if (tab[i+1]=='*'){
           tab2.push(multiplier(tab[i],tab[i+2]));
           tab2.push(tab[i+3]);
        }

        if (tab[i+1]=='-'){
            if(tab2.length == 0) {
                tab2.push(soustraire(tab[i],tab[i+2]));
            }            
        }

        if (tab[i+1]=='+'){
            if(tab2.length === 0) {
            tab2.push(add(tab[i],tab[i+2]));
        }
    }
    }

    if(tab2[tab2.length-1]=='='){
        tab2.pop();
    }
    
    return tab2;


}
