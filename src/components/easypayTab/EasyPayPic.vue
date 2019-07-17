<template>
  <div class="easyPayPic">
        <img style="width:100% ;" :src="imgurl"/>
  </div>
</template>

<script>
export default {
  name: "EasyPayPic",
  data() {
    return {
       imgurl:require("../../assets/easyPay3.jpg")
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