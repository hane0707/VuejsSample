// フィルター：通貨書式「#,###,###」
Vue.filter('number_format', function(val){
    return val.toLocaleString();
});