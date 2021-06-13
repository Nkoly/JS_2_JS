function show(state) {
    document.getElementById('chooseStuff').style.display = state;
}
function Hamburger(typeHam) {
    this.sumCost = 0; //суммарная стоимость
    this.sumCalorie = 0; // суммарная калорийность
    this.typeHam = typeHam; // тип выбранного гамбурера
    this.data = { // ссылки на данные о гамбургерах, начинках и приправах
        size_small: Hamburger.SIZE_SMALL,
        size_large: Hamburger.SIZE_LARGE,
        stuffing_cheese: Hamburger.STUFFING_CHEESE,
        stuffing_salad: Hamburger.STUFFING_SALAD,
        stuffing_potato: Hamburger.STUFFING_POTATO,
        topping_spice: Hamburger.TOPPING_SPICE,
        topping_mayo: Hamburger.TOPPING_MAYO
    };
    this.result = {  // результат без приправ
        size: this.typeHam,
        stuffing: '',
    };
    // я подозревал, что по заданию должна быть возможность
    // добавить любую из приправ или обе одновременно
    this.toppings = {
        topping_spice: false,
        topping_mayo: false
    };
}

// вводим постоянные величины приватно
Hamburger.SIZE_SMALL = {
    name: 'Маленький CatBurger',
    cost: 50,
    calorie: 20
};
Hamburger.SIZE_LARGE = {
    name: 'Большой CatBurger',
    cost: 100,
    calorie: 40
};
Hamburger.STUFFING_CHEESE = {
    name: 'Сыр',
    cost: 10,
    calorie: 20
};
Hamburger.STUFFING_SALAD = {
    name: 'Салат',
    cost: 20,
    calorie: 5
};
Hamburger.STUFFING_POTATO = {
    name: 'Картофель',
    cost: 15,
    calorie: 10
};
Hamburger.TOPPING_SPICE = {
    name: 'Приправа',
    cost: 15,
    calorie: 0
};
Hamburger.TOPPING_MAYO = {
    name: 'Майонез',
    cost: 20,
    calorie: 5
};

// выводим информацию по выбранному гамбургеру
Hamburger.prototype.addInfoAboutHamburger = function () {
    // при выборе гамбургера инфа о начинках и приправах обнуляется
     var stuffingElem = document.querySelector('#res_stuffing');
     stuffingElem?stuffingElem.parentNode.removeChild(stuffingElem):'';
     var toppingElem = document.querySelector('#res_topping');
     toppingElem?toppingElem.parentNode.removeChild(toppingElem):'';
     var res = document.querySelector('#res_ham');
     if (!res) {
         res = document.createElement('p');
         res.id = 'res_ham';
         document.querySelector('#result').appendChild(res);
     }
     res.innerHTML = 'Выбран: <span class="bold">' + this.data[this.typeHam].name +
                     '</span>. Стоимость: <span class="bold">' + this.data[this.typeHam].cost +
                     ' руб.</span> Калорийность: <span class="bold">' + this.data[this.typeHam].calorie + ' кал.</span>';
     this.calcCost();
     this.calcCalorie();
};

// выводим информацию о начинках
Hamburger.prototype.addInfoAboutStuffing = function (typeStuffing) {
    this.result.stuffing = typeStuffing;
    var res = document.querySelector('#res_stuffing');
    if (!res) {
        res = document.createElement('p');
        res.id = 'res_stuffing';
        document.querySelector('#result').appendChild(res);
    }
    res.innerHTML = 'Выбрана начинка: <span class="bold">' + this.data[this.result.stuffing].name +
                    '</span>. Стоимость: <span class="bold">' + this.data[this.result.stuffing].cost +
                     'руб.</span> Калорийность: <span class="bold">' + this.data[this.result.stuffing].calorie + ' кал.</span>';
    this.calcCost();
    this.calcCalorie();
};

// выводим информацию о приправах
Hamburger.prototype.addInfoAboutToppings = function (typeTopping) {
    // по заданию нужно обязательно выбрать начинку
    // соответственно, если юзер выбирает приправу, не выбрав начинку,
    // напоминаем ему, что нужно выбрать сначала начинку
    if (!this.result.stuffing) {
        alert("Сначала выберите бургер и начинку");
    } 
    else {
        this.toppings[typeTopping] = true;
        var res = document.querySelector('#res_topping');
        if (!res) {
            res = document.createElement('p');
            res.id = 'res_topping';
            document.querySelector('#result').appendChild(res);
        }
        var resTopping = document.querySelector('#my_' + typeTopping);
        if (!resTopping) {
            resTopping = document.createElement('p');
            resTopping.id = 'my_' + typeTopping;
            document.querySelector('#res_topping').appendChild(resTopping);
        }
        resTopping.innerHTML = 'Дополнительно добавлено: <span class="bold">' + this.data[typeTopping].name +
            '</span>. Стоимость: <span class="bold">' + this.data[typeTopping].cost +
            ' руб.</span> Калорийность: <span class="bold">' + this.data[typeTopping].calorie + ' кал.</span>';

        this.calcCost();
        this.calcCalorie();
    }

};

//рассчитываем суммарную стоимость
Hamburger.prototype.calcCost = function() {
    this.sumCost = 0;
    for (var item in this.result) {
        if (this.result[item]) {
            this.sumCost += this.data[this.result[item]].cost;
        }
    }
    this.sumCost += this.calcCostToppings();
    var costElem = document.querySelector('#sum_cost');
    costElem.innerHTML = 'Суммарная стоимость: ' + this.sumCost + ' руб.';
};

// рассчитываем суммарную калорийность
Hamburger.prototype.calcCalorie = function () {
    this.sumCalorie = 0;
    for (var item in this.result) {
        if (this.result[item]) {
            this.sumCalorie += this.data[this.result[item]].calorie;
        }
    }
    this.sumCalorie += this.calcCalorieToppings();
    var costElem = document.querySelector('#sum_calorie');
    costElem.innerHTML = 'Суммарная калорийность: ' + this.sumCalorie + ' кал.';
};

// так как есть возможность добавлять обе приправы одновременно,
// их суммарная стоимость рассчитывается отдельно и в функции суммарного подсчета стоимости
// прибавляется ко всей сумме
Hamburger.prototype.calcCostToppings = function () {
    var sumCostToppings = 0;
    for (var item in this.toppings) {
        if (this.toppings[item]) {
            sumCostToppings += this.data[item].cost;
        }
    }
    return sumCostToppings;
};

// суммарная калорийность припав также рассчитывается отдельно
Hamburger.prototype.calcCalorieToppings = function () {
    var sumCalorieToppings = 0;
    for (var item in this.toppings) {
        if (this.toppings[item]) {
            sumCalorieToppings += this.data[item].calorie;
        }
    }
    return sumCalorieToppings;
};

window.onload = function () {
    var myHamburger; // будущий новый объект

    // список доступных гамбургеров и прочего выводится сразу через html
    // здесь подписываем на события каждый элемент с гамбургерами в коде html
    // и вызываем функции, в которых подписываем на события элементы с начинками и приправами
    var typeHamElem = document.querySelectorAll('.type_ham');
    for (var i = 0; i < typeHamElem.length; i++) {
        typeHamElem[i].onclick = function () {
            myHamburger = new Hamburger(this.id);
            myHamburger.addInfoAboutHamburger();
            addEventToStuffing(myHamburger);
            addEventToTopping(myHamburger);
        }
    }

    // подписываем на события элементы с начинками
    function addEventToStuffing(obj) {
        var typeStuffingElem = document.querySelectorAll('.type_stuffing');
        for (var i = 0; i < typeStuffingElem.length; i++) {
            typeStuffingElem[i].onclick = function () {
                obj.addInfoAboutStuffing(this.id)
            };
        }
    }

    // подписываем на события элементы с приправами
    function addEventToTopping(obj) {
        var typeToppingElem = document.querySelectorAll('.type_topping');
        for (var i = 0; i < typeToppingElem.length; i++) {
            typeToppingElem[i].onclick = function () {
                obj.addInfoAboutToppings(this.id)
            };
        }
    }
};