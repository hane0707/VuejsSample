// フィルター：通貨書式「#,###,###」
Vue.filter('number_format', function(val){
    return val.toLocaleString();
});

var app = new Vue({
    el: '#app',
    data: {
        taxRate: 0.1,
        movieType: '余興ムービー',
        wedding_date: '',
        delivery_date: '',
        basePrice: 30000,
        // 割増料金
        addPrice1: 5000, // 納期が1ヶ月未満の場合
        addPrice2: 10000, // 納期が3週間未満の場合
        addPrice3: 15000, // 納期が2週間未満の場合
        addPrice4: 20000, // 納期が1週間未満の場合
        addPrice5: 40000, // 納期が3日後の場合
        addPrice6: 45000, // 納期が2日後の場合
        addPrice7: 50000, // 納期が翌日の場合
        // オプション
        opt1_use: false, // BGM手配
        opt1_price: 5000,
        opt2_use: false, // 撮影
        opt2_price: 5000,
        opt3_use: false, // DVD盤面印刷
        opt3_price: 5000,
        opt4_num: 0, // 写真スキャニング
        opt4_price: 500,
        optPrice: 0,

        totalPrice: 0
    },
    methods: {
        // 税抜⇒税込
        incTax: function(untaxed){
            return Math.floor(untaxed * (1 + this.taxRate));
        },
        // 日付の差分
        getDateDiff: function(dateString1, dateString2){
            var date1 = new Date(dateString1);
            var date2 = new Date(dateString2);
            // 日付の差分を計算し、ミリ秒で取得
            var msDiff = date1.getTime() - date2.getTime();
            
            return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
        },
        formatDate: function(dt){
            var y = dt.getFullYear();
            var m = ('00' + (dt.getMonth() + 1)).slice(-2);
            var d = ('00' + dt.getDate()).slice(-2);
            return (y + '-' + m + '-' + d);
        }
    },
    computed: {
        taxedOpt1: function(){
            return this.incTax(this.opt1_price);
        },
        taxedOpt2: function(){
            return this.incTax(this.opt2_price);
        },
        taxedOpt3: function(){
            return this.incTax(this.opt3_price);
        },
        taxedOpt4: function(){
            return this.incTax(this.opt4_price);
        },
        taxedBasePrice: function(){
            var addPrice = 0;
            // 納期までの残り日数を計算
            var dateDiff = this.getDateDiff(this.delivery_date, (new Date()).toLocaleDateString());
            // 割増料金を計算
            if(dateDiff == 1){
                // 翌日の場合
                addPrice = this.addPrice7;
            }
            else if(dateDiff == 2){
                // 2日後の場合
                addPrice = this.addPrice6;
            }
            else if(dateDiff == 3){
                // 3日後の場合
                addPrice = this.addPrice5;
            }
            else if(dateDiff < 7){
                // 1週間未満の場合
                addPrice = this.addPrice4;
            }
            else if(dateDiff < 14){
                // 2週間未満の場合
                addPrice = this.addPrice3;
            }
            else if(dateDiff < 21){
                // 3週間未満の場合
                addPrice = this.addPrice2;
            }
            else if(dateDiff < 30){
                // 1ヶ月未満の場合
                addPrice = this.addPrice1;
            }

            return this.incTax(this.basePrice + addPrice);
        },
        taxedOptPrice: function(){
            var optPrice = 0;
            if(this.opt1_use){ optPrice += this.opt1_price; }
            if(this.opt2_use){ optPrice += this.opt2_price; }
            if(this.opt3_use){ optPrice += this.opt3_price; }
            if(this.opt4_num == ''){ opt4_price = 0; }
            optPrice += this.opt4_num * this.opt4_price;

            return this.incTax(optPrice);
        },
        taxedTotalPrice: function(){
            return (this.taxedBasePrice + this.taxedOptPrice);
        },
        // 翌日の日付を返す（※dateオプションプロパティとcreatedライフサイクルにそれぞれ記載を追加するよりも保守性を重視）
        tommorow: function(){
            var dt = new Date();
            dt.setDate(dt.getDate() + 1);
            return this.formatDate(dt);
        }
    },
    created: function(){
        var dt = new Date();
        // 挙式日に2ヶ月後の日付を設定
        dt.setMonth(dt.getMonth() + 2);
        this.wedding_date = this.formatDate(dt);
        // DVD仕上がり予定日に、挙式日の1週間前の日付を設定
        dt.setDate(dt.getDate() - 7);
        this.delivery_date = this.formatDate(dt);
    }
});