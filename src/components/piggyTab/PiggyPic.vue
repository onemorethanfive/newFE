<template>
  <div class="piggypic">
        <img style="width:100% ;" :src="imgurl"/>
  </div>
</template>

<script>
export default {
  name: "PiggyBag",
  data() {
    return {
       imgurl:require("../../assets/piggybank.png")
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