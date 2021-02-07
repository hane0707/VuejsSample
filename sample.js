Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        pSize: '40px',
        stock: 10,
        width: window.innerWidth,
        height: window.innerHeight,
        point: {x: 0, y: 0},
        soldMessage: '',
        year: (new Date()).getFullYear()
    },
    created: function(){
        // イベントハンドラを登録
        addEventListener('resize', this.resizeHandler);
        addEventListener('mousemove', this.mousemoveHandler);
    },
    beforeDestroy: function(){
        // イベントハンドラを解除
        removeEventListener('resize', this.resizeHandler);
        removeEventListener('mousemove', this.mousemoveHandler);
    },
    methods: {
        onDeleteItem: function() {
            this.stock--;
        },
        // イベントハンドラ
        resizeHandler: function($event){
            // 現在のウィンドウサイズでプロパティを更新
            this.width = $event.target.innerWidth;
            this.height = $event.target.innerHeight;
        },
        mousemoveHandler: function($event){
            // 現在のマウス位置でプロパティを更新
            this.point.x = $event.clientX;
            this.point.y = $event.clientY;
        }
    },
    watch: {
        // 在庫数が変化した時に呼び出されるハンドラ
        stock: function(newStock, oldStock) {
            if (newStock == 0){
                this.soldMessage = '売り切れ';
            }
        }
    }
});