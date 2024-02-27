document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementsByTagName("button");
    let res = document.getElementById("res");
    const regex = /(-?\d+(\.\d+)?|[+\-*/])/g;
    let isResultDisplayed = false;


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
                let expression;
                event.target.style.backgroundColor = "white";
                if (!isResultDisplayed && button[i].value != "suppr.") {
                    res.innerHTML += button[i].value;
                    if (button[i].value == "=") {
                        expression = res.textContent.trim().match(regex);
                        resultat = calcul(expression);
                        res.innerHTML += resultat;
                        isResultDisplayed = true;
                    }
                } else if (!isResultDisplayed && button[i].value == "suppr."){
                    expression = res.textContent.trim().match(regex);
                    expression.pop();
                    res.innerHTML = expression;
                } else if (isResultDisplayed && button[i].value == "suppr.") {
                    res.innerHTML = "";
                    isResultDisplayed = false;
                }
            }
        );

    }

});

function multiplier(num1, num2) {
    return num1 * num2;
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function soustraire(num1, num2) {
    return num1 - num2;
}

function diviser(num1, num2) {
    return num1 / num2;
}

function calcul(tab) {
    let tab2 = [];

    switch (tab[1]) {
        case '+':
            if (tab[3] != '*' && tab[3] != '/') {
                tab2.push(add(tab[0], tab[2]));
                tab = tab.slice(3);
                tab2 = tab2.concat(tab);
            } else {
                tab2 = tab2.concat(tab.slice(0, 2));
                tab2 = tab2.concat(calcul(tab.slice(2)));
            }
            break;
        case '-':
            if (tab[3] != '*' && tab[3] != '/') {
                tab2.push(soustraire(tab[0], tab[2]));
                tab = tab.slice(3);
                tab2 = tab2.concat(tab);
            } else {
                tab2 = tab2.concat(tab.slice(0, 2));
                tab2 = tab2.concat(calcul(tab.slice(2)));
            }
            break;
        case '*':
            tab2.push(multiplier(tab[0], tab[2]));
            tab = tab.slice(3);
            tab2 = tab2.concat(tab);
            break;
        case '/':
            tab2.push(diviser(tab[0], tab[2]));
            tab = tab.slice(3);
            tab2 = tab2.concat(tab);
            break;
        default:
            if (tab[3] != '*' && tab[3] != '/') {
                tab2.push(soustraire(tab[0], Math.abs(tab[1])));
                tab = tab.slice(2);
                tab2 = tab2.concat(tab);
            } else {
                tab2 = tab2.concat(tab.slice(0, 1));
                tab2 = tab2.concat(calcul(tab.slice(1)));
            }                        
    }

    if (tab2.length > 1) {
        return calcul(tab2);
    }
    else {
        return tab2[0];
    }

}
