//  商品一覧コンポーネント
var app = new Vue({
    el: '#app',
    data: {
        products: [
            { id: 1, name: 'ばいこーん<br>しんわのいきもの', price: 1580, image: 'images/01.png', delv: 0, isSale: true},
            { id: 2, name: 'あめみっと<br>しんわのいきもの', price: 1780, image: 'images/02.png', delv: 0, isSale: true},
            { id: 3, name: 'しろいぞう<br>しんわのいきもの', price: 1580, image: 'images/03.png', delv: 240, isSale: true},
            { id: 4, name: 'ねずみのおうさま<br>しんわのいきもの', price: 980, image: 'images/04.png', delv: 0, isSale: true},
            { id: 5, name: 'れう"ぃあたん<br>しんわのいきもの', price: 980, image: 'images/05.png', delv: 0, isSale: false},
            { id: 6, name: 'すらいむ<br>しんわのいきもの', price: 1580, image: 'images/06.png', delv: 0, isSale: false}
        ]
    }
})