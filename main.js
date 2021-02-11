// フィルター：通貨書式「#,###,###」
Vue.filter('number_format', function(val){
    return val.toLocaleString();
});

//  商品一覧コンポーネント
var app = new Vue({
    el: '#app',
    data: {
        showSaleItem: false,
        showDelvFree: false,
        sortOrder: 1,
        products: [
            { id: 1, name: 'ばいこーん<br>しんわのいきもの', price: 1580, image: 'images/01.png', delv: 0, isSale: true},
            { id: 2, name: 'あめみっと<br>しんわのいきもの', price: 1780, image: 'images/02.png', delv: 0, isSale: true},
            { id: 3, name: 'しろいぞう<br>しんわのいきもの', price: 1580, image: 'images/03.png', delv: 240, isSale: true},
            { id: 4, name: 'ねずみのおうさま<br>しんわのいきもの', price: 980, image: 'images/04.png', delv: 0, isSale: true},
            { id: 5, name: 'れう"ぃあたん<br>しんわのいきもの', price: 980, image: 'images/05.png', delv: 0, isSale: false},
            { id: 6, name: 'すらいむ<br>しんわのいきもの', price: 1580, image: 'images/06.png', delv: 0, isSale: false}
        ]
    },
    computed: {
        // 算出プロパティはリアクティブデータ（ここではshowSaleなど）が更新されるたびに再評価・実行される）
        // 絞込後の商品リストを返す算出プロパティ
        filteredList: function(){
            var newList = [];

            // 表示・非表示の切替
            for(var i=0; i<this.products.length; i++){
                var isShow = true;
                if(this.showSaleItem && !this.products[i].isSale){
                    isShow = false;
                }
                if(this.showDelvFree && this.products[i].delv > 0){
                    isShow = false;
                }
                if(isShow){
                    newList.push(this.products[i]);
                }
            }

            // 配列の並び替え
            if(this.sortOrder == 2){
                // 価格が安い順
                newList.sort(function(a, b){
                    return (a.price + a.delv) - (b.price + b.delv);
                });
            }

            return newList;
        }
    }
})