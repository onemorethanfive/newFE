<template>
  <div class="pieboard">
    <div id="pieChart" :style="{ width:'90%',height: '100%'}"></div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  data () {
    return {
        userId:'1',
        list:[],
    }
  },
	methods: {
    async getData(){
        var _self = this;
        const {data} = await this.$axios.get('http://localhost:6060/bill/getBillsByMonth/'+this.userId);
        _self.list = data;
        for (var i = 0 ;i<data.length;i++){
            _self.list[i]["value"] = _self.list[i]["billNumber"];
            _self.list[i]["name"] = _self.list[i]["billTag"];
            delete _self.list[i]["billNumber"];
            delete _self.list[i]["billTag"];
        }

        _self.drawPie();
    }
    ,
    drawPie() {
        var _this = this;
        let pieChart = this.$echarts.init(document.getElementById('pieChart'))
        var option={
            backgroundColor: '#2c343c',
            title: {
                text: '当月支出饼状图',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 1000,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'支出钟类',
                    type:'pie',
                    radius : '90%',
                    center: ['50%', '50%'],
                    data:this.list.sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };

        pieChart.setOption(option);
        setTimeout(function (){
            window.addEventListener("resize",()=>{
                pieChart.resize();
                if (document.body.clientWidth < 768) {
                    _this.$root.visible =false;
                }else{
                    _this.$root.visible =true;
                }
            })
        },200)
    }
  },
  mounted: function(){
    this.getData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .pieboard{
    background-color: rgba(255, 255, 255);
    border-radius:10px;
        height: 100%;
  }
  
</style>
