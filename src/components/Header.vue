<template>
  <div class="hello">
    <div id="header" class="gtco-nav">
      <div class="container">
        <div id="gtco-logo" style="padding-top: 1.5%;">
          <a id="easylogot">
            {{elife}}
            <em style="font-style: normal;font-weight:400">{{elife2}}</em>
          </a>
        </div>
      </div>
      <el-menu
        :default-active="activeIndex2"
        id="menus"
        class="el-menu-vertical-demo"
        background-color="rgba(255, 255, 255, 0)"
        active-text-color="#f7596e"
        text-color="white"
        style="font-weight: 550;float:left;margin-top:0px;border-right: none;"
        :collapse="isCollapse"
      >
        <el-menu-item index="1" @click="curTab='BillTab'">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">资产管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="curTab='EasyPayTab'">
          <i class="el-icon-menu"></i>
          <span slot="title">便民服务</span>
        </el-menu-item>
        <el-menu-item index="3" @click="curTab='LimitTab'">
          <i class="el-icon-document"></i>
          <span slot="title">限额提醒</span>
        </el-menu-item>
        <el-menu-item index="4" @click="curTab='PiggyBagTab'">
          <i class="el-icon-setting"></i>
          <span slot="title">小猪储蓄</span>
        </el-menu-item>
        <el-menu-item index="5" @click="handleSubmit">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户登出</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <component :is="curTab"></component>
    </div>
  </div>
</template>

<script>
import BillTab from "./billTab/BillTab";
import EasyPayTab from "./easypayTab/EasyPayTab";
import PiggyBagTab from "./piggyTab/PiggyBagTab";
import LimitTab from "./limitTab/LimitTab";
export default {
  components: {
    BillTab,
    EasyPayTab,
    PiggyBagTab,
    LimitTab
  },
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      scroll: "",
      isCollapse: false,
      elife: "易生活",
      elife2: "EasyLife",
      curTab: "billTab"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeTab(tab) {
      this.curTab = tab;
    },
    menuScrolled() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (this.scroll > 1 && this.scroll < 400) {
        document.getElementById("header").classList.add("scrolled");
        document
          .getElementsByClassName("container")[0]
          .classList.add("scrolled");
        document.getElementById("menus").classList.add("scrolled");
        document
          .getElementsByClassName("el-menu-item")[0]
          .classList.add("scrolled");
      } else if (this.scroll > 400) {
        document.getElementById("header").classList.remove("scrolled");
        document
          .getElementsByClassName("container")[0]
          .classList.remove("scrolled");
        document.getElementById("menus").classList.remove("scrolled");
        document
          .getElementsByClassName("el-menu-item")[0]
          .classList.remove("scrolled");
      }
    },
    handleSubmit(event) {
      var _self = this;
      alert("即将登出!");
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.menuScrolled);
    window.onresize = () => {
      console.log("window.onresize");
      if (document.body.clientWidth < 768) {
        this.elife = "易";
        this.elife2 = "";
        document
          .getElementsByClassName("container")[0]
          .classList.add("collapsed");
        document.getElementById("header").classList.remove("scrolled");
        document
          .getElementsByClassName("container")[0]
          .classList.remove("scrolled");
        document.getElementById("easylogot").classList.add("easylogo");
        document.getElementById("menus").classList.remove("scrolled");
        document
          .getElementsByClassName("el-menu-item")[0]
          .classList.remove("scrolled");
        this.isCollapse = true;
        window.removeEventListener("scroll", this.menuScrolled);
      } else {
        this.elife = "易生活";
        this.elife2 = "EasyLife";

        document.getElementById("easylogot").classList.remove("easylogo");
        window.addEventListener("scroll", this.menuScrolled);
        document
          .getElementsByClassName("container")[0]
          .classList.remove("collapsed");
        this.isCollapse = false;
      }
    };
    if (document.body.clientWidth < 768) {
      this.isCollapse = true;
      this.elife = "易";
      this.elife2 = "";
      document.getElementById("easylogot").classList.add("easylogo");
      document
        .getElementsByClassName("container")[0]
        .classList.add("collapsed");
      this.isCollapse = true;
      window.removeEventListener("scroll", this.menuScrolled);
    } else {
      this.elife = "易生活";
      this.elife2 = "EasyLife";
      window.addEventListener("scroll", this.menuScrolled);
      document
        .getElementsByClassName("container")[0]
        .classList.remove("collapsed");
      this.isCollapse = false;
    }
  },
  created: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#gtco-logo {
  margin-top: 1.5%;
  font-size: 3.2rem;
  width: 250px;
  text-align: left;
  line-height: 1;
  margin: 0;
  padding: 0px 10px;
  color: #cf1322;
  float: left;
  font-weight: 700;
}
.easylogo {
  font-size: 3.6rem;
  border: 5px solid;
  border-radius: 10px;
}
.gtco-nav {
  position: fixed;
  top: 0;
  margin: 0;
  padding: 0;
  z-index: 1001;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
.container {
  height: 62px;
  width: 30%;
  margin-right: auto;
  padding-top: 0.8%;
  padding-left: 0.3%;
}
.gtco-nav.scrolled {
  border-radius: 0px 0px 20px 20px;
  background: #fff;
  width: 100%;
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
.gtco-nav.scrolled #gtco-logo em,
.gtco-nav.scrolled #gtco-logo a {
  color: #cf1322;
}
.el-menu {
  color: #4c4444;
}
.el-menu-item.is-active {
  color: #cf1322 !important;
}
.el-menu.scrolled {
  color: black;
}
.el-menu-item {
  color: inherit !important;
  font-size: 2rem;
}
.container.scrolled {
  display: inline;
}
.container.collapsed {
  display: block;
}
.el-menu--collapse {
  background-color: white !important;
  border-radius: 10px;
}

#menus.scrolled {
  color: black;
}
.piggy {
  margin-top: 5%;
}
</style>
