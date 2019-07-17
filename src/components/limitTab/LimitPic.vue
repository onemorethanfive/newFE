<template>
  <div class="limitPic">
        <img style="width:100% ;" :src="imgurl"/>
  </div>
</template>

<script>
export default {
  name: "LimitPic",
  data() {
    return {
       imgurl:require("../../assets/limit2.jpg")
    };
  },
  methods: {
    
  },
  mounted() {},
  created: function() {
  }
};
</script>


<style scoped>
.box-card1{
  width: 50%;
  margin: 0 auto;
}
</style>