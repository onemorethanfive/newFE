<template>  
<div>
  <div class="overlay">
  <section id="gtco-hero" class="gtco-cover" style="background-image: url;" data-section="home" data-stellar-background-ratio="0.5">
    <img style="width:100% ;" :src="imgurl"/>
    <img style="width:100% ;" :src="imgurl"/>
    <img style="width:100% ;" :src="imgurl"/>
    
  
  </section>
  </div>
</div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      fit:'contain',
      imgurl:require("../assets/img_bg_4.jpg")
    }
  },
	methods: {
  },
  created: function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gtco-cover {
  height: 900px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  float: left;
  width: 100%;
}
.overlay{
  z-index: 1;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(35, 35, 35, 0.5);
}

</style>
