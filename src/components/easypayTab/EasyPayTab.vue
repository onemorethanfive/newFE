
<template>
  <div id="easyPayTab">
    <el-row>
      <div class="easyPayPic">
        <EasyPayPic />
      </div>
    </el-row>
    <el-row>
      <div class="sitePanel">
        <SitePanel />
      </div>
    </el-row>
    <el-row>
      <div class="buttonPanel">
        <ButtonPanel />
      </div>
    </el-row>
  </div>
</template>
    
<script>
import ButtonPanel from "./ButtonPanel";
import SitePanel from "./SitePanel";
import EasyPayPic from "./EasyPayPic";
export default {
  name: "EasyPayTab",
  components: {
    ButtonPanel,
    SitePanel,
    EasyPayPic
  },
  data() {
    return {};
  }
};
</script>

<style>
.buttonPanel {
  height: 100vw;
  top: 10px;
  position: relative;
  text-align: -webkit-center;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.sitePanel {
  top: 0vw;
  height: 10px;
  position: relative;
  text-align: -webkit-center;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.el-row{
  background-color: transparent
}
</style>