
<template>
  <div id="easyPayTab">
    <div class="sitePanel">
      <SitePanel />
    </div>
    <div class="buttonPanel">
      <ButtonPanel />
    </div>
  </div>
  
</template>
    
<script>
import ButtonPanel from "./ButtonPanel";
import SitePanel from "./SitePanel";
export default {
  name: "EasyPayTab",
  components: {
    ButtonPanel,
    SitePanel
  }
};
</script>

<style>
.buttonPanel {
  height: 100vw;
  top: 200px;
  position: relative;
  text-align: -webkit-center;
  left: 0;
  right: 0;
  margin: 0 auto;
  
}
.sitePanel {
  height: 10vw;
  top: 150px;
  position: relative;
  text-align: -webkit-center;
  left: 0;
  right: 0;
  margin: 0 auto;
}

</style>