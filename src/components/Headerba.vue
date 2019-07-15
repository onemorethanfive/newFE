<template>
  <div class="hello">
    <el-dropdown class="dropdown">
      <el-avatar  icon="el-icon-circle-plus"  style="background:#b30000">
      </el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>资产管理</el-dropdown-item>
        <el-dropdown-item>便民服务</el-dropdown-item>
        <el-dropdown-item>限额提醒</el-dropdown-item>
        <el-dropdown-item>用户管理</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-menu
      :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="rgba(255, 255, 255, 0)"
        active-text-color="#f7596e"
        text-color="white"
        style="font-weight: 550;width: 100%;margin-top:0px"
        :collapse="isCollapse">
      <el-menu-item index="1" style="margin-left:100px">资产管理</el-menu-item>
      <el-menu-item index="2" >便民服务</el-menu-item>
      <el-menu-item index="3" >限额提醒</el-menu-item>
      <el-menu-item index="4" >用户管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      scroll:'',
      isCollapse: true
    }
  },
	methods: {
    handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
    menuScrolled(){
      this.scroll = document.documentElement.scrollTop||document.body.scrollTop;
      
      if (this.scroll > 50) {
				document.getElementById('header').classList.add('scrolled');
        document.getElementsByClassName('el-menu-demo')[0].classList.add('scrolled');
        document.getElementsByClassName('el-menu-item')[0].classList.add('scrolled');
			} else {
				document.getElementById('header').classList.remove('scrolled');
        document.getElementsByClassName('el-menu-demo')[0].classList.remove('scrolled');
        document.getElementsByClassName('el-menu-item')[0].classList.remove('scrolled');
			}
    }
  },
  mounted(){
    window.addEventListener('scroll', this.menuScrolled,true)
  },
  created: function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#gtco-logo {
  margin-top:1.5%;
  font-size: 3.2rem;
  width:250px;
  line-height: 1;
  margin: 0;
  padding: 0px 10px;
  color: #fff;
  float: left;
  font-weight: 700;
}
.gtco-nav {
  position: fixed;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 1001;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
.container{
  height:62px;
  width: 1170px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
}
.gtco-nav.scrolled {
  background: #fff;
  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
}

.gtco-nav.scrolled ul {
  padding: 0;
  margin: 1px 0 0 0;
}
.gtco-nav.scrolled ul li {
  margin: 0;
  list-style: none;
  display: inline;
}
.gtco-nav.scrolled ul li a {
  color: rgba(0, 0, 0, 0.5);
}
.gtco-nav.scrolled ul li a:hover {
  color: black;
}
.gtco-nav.scrolled ul li.active > a {
  color: #5f86b7 !important;
}
.gtco-nav.scrolled ul li.btn-cta a {
  color: #fff;
}
.gtco-nav.scrolled ul li.btn-cta a span {
  border: none !important;
  background: #5f86b7;
  padding: 4px 20px;
  color: #fff;
}
.gtco-nav.scrolled #gtco-logo em, .gtco-nav.scrolled #gtco-logo a {
  color: #cf1322;
}
.el-menu{
  color:white;
}
.el-menu-item.is-active{
  color:#cf1322!important;
}
.el-menu.scrolled{
  color:black;
}
.el-menu-item{
  color:inherit!important;
}

.dropdown{
  float: left;
}

</style>
