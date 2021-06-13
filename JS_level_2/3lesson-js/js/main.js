let cart = {
  'sisls23': {
    "name" : "shirt",
    "count" : 3,
  },
  'pgmry28': {
    "name" : "shirt",
    "count" : 3,
  },
};


class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = []; //массив товаров с версткой
        this._fetchProducts();
        this.render(); //вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [{
                id: 1,
                title: 'Shirt',
                price: 150
            },
            {
                id: 2,
                title: 'Socks',
                price: 50
            },
            {
                id: 3,
                title: 'Jacket',
                price: 350
            },
            {
                id: 4,
                title: 'Shoes',
                price: 250
            },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            this.allProducts.push(item);
            block.insertAdjacentHTML("beforeend", item.render());
            //block.innerHTML += item.render();
        }
    }

    totalSum() {
        let sum = 0;
        this.goods.forEach((product) => {
            sum += product.price;
        });
        console.log('Сумма элементов: ' + sum);
        document.querySelector('.sum').innerHTML = `Сумма заказа: ${sum} рублей`;
    }
}


class ProductItem {
    constructor(product, img = 'img/shirts.jpg') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn plus" data-id="sisls23">+</button>
                <button class="buy-btn minus" data-id="sisls23">-</button>
            </div>`
    }
}

document.onclick = event => {
  //console.log(event.target.classList);
  if (event.target.classList.contains('plus')) {
    //console.log(event.target.dataset.id);
    plusFunction(event.target.dataset.id);
  }
  if (event.target.classList.contains('minus')) {
    //console.log(event.target.dataset.id);
    minusFunction(event.target.dataset.id);
  }
}

//Увеличение количества товара
const plusFunction = id => {
  cart[id]['count']++;
  renderCart();
}

//Уменьшение количества товара
const minusFunction = id => {
  if (cart[id]['count'] - 1 == 0) {
    deleteFunction(id);
    return true;

  }
  cart[id]['count']--;
  renderCart();
}

//Удаление товара
const deleteFunction = id => {
  delete cart[id]['count'];
  renderCart();
}



const renderCart = () => {
  console.log(cart);

}

renderCart();

class CartList {
    constructor() {

    }
    // метод для очистки корзины
    clearAll() {

    }
    //метод подсчета суммы купленных товаров
    totalSum() {

    }
    //метод оплаты товаров
    pay() {

    }
}

class CartItem {
    constructor() {

    }
    //удаляет один элемент из корзины
    deleteItem() {

    }
}

let list = new ProductList();
list.totalSum();

