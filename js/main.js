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
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

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


/*
class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ];
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

const init = () => {
    const list = new GoodsList();
    list.fetchGoods();
    list.render();
};

window.onload = init;
*/
