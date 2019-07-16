new Vue({
    router,
    data: function(){
        return {
            visible: true,
        }
    },
    render: h => h(App)
}).$mount('#app');