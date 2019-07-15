<template>
  <div class="pieboard">
    <div id="pieChart" :style="{ width:'90%',height: '350px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  data () {
    return {
        userId:'1',
        chartData:[],
        chartDate:[]
    }
  },
	methods: {
    async getData(){
        var _self = this;
        const {data} = await this.$axios.get('http://localhost:6060/dateBalance/getBalanceByUser/'+_self.userId);
        var list = [];
        var listdate = [];
        for (var i = 0 ;i<data.length;i++){
            list[i] = data[i].balance;
            listdate[i] = data[i].date.substring(0,10);
        }

        
        _self.chartData = list;
        _self.chartDate = listdate;
        _self.drawPie();
    }
    ,
    drawPie() {
        var base = +new Date(2018, 7, 13);
        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data = [Math.random() * 300];

        for (var i = 1; i < 365; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
        data = this.chartData;
        let pieChart = this.$echarts.init(document.getElementById('pieChart'))
        pieChart.setOption({
            backgroundColor: '#2c343c',
            title: {
                text: 'Customized Pie',
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
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value; }),
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
        })
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
    background-color: rgba(255, 255, 255, 0.61);
    border-radius:10px
  }
</style>
