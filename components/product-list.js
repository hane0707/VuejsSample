Vue.component('product-list', {
    template: `
    <div class="container">
        <product-header
            v-bind:count="filteredList.length"
            v-bind:showSaleItem="showSaleItem"
            v-bind:showDelvFree="showDelvFree"
            v-bind:sortOrder="sortOrder"
            v-on:showSaleItemChanged="showSaleItem=!showSaleItem"
            v-on:showDelvFreeChanged="showDelvFree=!showDelvFree"
            v-on:sortOrderChanged="sortOrderChanged">
        </product-header>
        <!--商品一覧-->
        <div class="list">
            <product
                v-for="product in filteredList"
                v-bind:product="product"
                v-bind:key="product.id">
            </product>
        </div>
    </div>`,
    components: {
        // 子コンポーネントの読み込み
        'product-header': productHeader,
        'product': product
    },
    props: ['products'], // 親（ルート）コンポーネントから受け取るプロパティ
    data: function(){
        return{
            showSaleItem: false,
            showDelvFree: false,
            sortOrder: 1
        }
    },
    methods: {
        sortOrderChanged: function(order){
            this.sortOrder = order;
        }
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