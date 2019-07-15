
<template>
  <div id="easyPayTab">
    <div class="buttonPanel">
      <ButtonPanel />
    </div>
  </div>
</template>
    
<script>
import ButtonPanel from "./ButtonPanel";
export default {
  name: "EasyPayTab",
  components: {
    ButtonPanel
  }
};
</script>

<style>
.buttonPanel {
  height: 100vw;
  top: 200px;
  position: relative;
  z-index: 1000;
  text-align: -webkit-center;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>