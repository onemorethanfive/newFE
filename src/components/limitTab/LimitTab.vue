<template>
  <div class="limitTab">
    <div class="limitPic">
      <LimitPic />
    </div>
    <div class="limitProgress">
      <LimitProgress />
    </div>
  </div>
</template>

<script>
import LimitPic from "./limitPic";
import LimitProgress from "./LimitProgress";
export default {
  name: "LimitTab",
  components :{
    LimitPic,
    LimitProgress
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created: function() {}
};
</script>

<style scoped>
.box-card1{
  width: 50%;
  margin: 0 auto;
}
</style>