new Vue({
    router,
    data: function(){
        return {
            visible: true,
            lab1:'test',
            is:true
        }
    },
    render: h => h(App)
}).$mount('#app');