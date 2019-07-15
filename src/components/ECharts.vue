<template>
  <div class="board">
    <div id="lineChart" :style="{ width:'90%',height: '350px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  data () {
    return {
        userId:'1',
        chartData:[],
        chartDate:[]
    }
  },
	methods: {
    drawLine(){
        let lineChart = this.$echarts.init(document.getElementById('lineChart'))
        lineChart.setOption({
            title: { text: '当月余额变化：（元）' ,
                      textStyle:{
                          color:'white',
                          fontSize:'50'
                      },
                      x:'center'          
                },
            tooltip: {},
            xAxis: {
                data: ["6/1","6/2","6/3","6/4","6/5","6/6","6/7","6/8","6/9","6/10","6/11","6/12","6/13","6/14","6/15","6/16","6/17","6/18","6/19","6/20","6/21","6/22","6/23","6/24","6/25","6/26","6/27","6/28","6/29","6/30"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                itemStyle : {  
                  normal : {  
                    color:'#00FF00',  
                    lineStyle:{  
                      color:'#00FF00' 
                    },
                    textStyle:{
                      fontSize:10,
                      color:'#000000'
                    }
                  } ,
                  label:{
                    textStyle:{
                      fontSize:10,
                      color:'#000000'
                    }
                  }
                },  
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
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
        _self.drawLine1();
    }
    ,
    drawLine1() {
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
        let lineChart = this.$echarts.init(document.getElementById('lineChart'))
        lineChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '个人资产余额变化图'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none' 
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',  
                boundaryGap: false,  // 无间隙
                data: this.chartDate
            },
            yAxis: {
                type: 'value', 
                boundaryGap: [0, '100%'] // 分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，
            },
            dataZoom: [{                 // 内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系 
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,              
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',       
                handleStyle: {
                    color: 'pink',
                    shadowBlur: 3,      
                    shadowColor: 'red',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name: '模拟数据',
                    type: 'line',
                    smooth: false, 
                    symbol: 'none',
                    sampling: 'average', 
                    itemStyle: {                
                        normal: {
                            color: 'rgb(255, 70, 131)' 
                        }
                    },
                    areaStyle: {  
                    },
                    data: data
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
  .board{
    background-color: rgba(255, 255, 255, 0.61);
    border-radius:10px
  }
</style>
