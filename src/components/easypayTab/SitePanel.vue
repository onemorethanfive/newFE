<template>
  <div>
    <el-col :xs="{span:8,offset:4}" :sm="{span:4,offset:7}" :md="{span:4,offset:8}">
      <div  class="moneytt">当前地址:</div>
    </el-col>
    <el-col :xs="{span:8}" :sm="{span:4}" :md="{span:3}">
      <div class="moneytt">{{site}}</div>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" icon="el-icon-edit" circle @click="addSitePanel" size="mini"></el-button>
    </el-col>
    <el-dialog
      title="地址信息"
      :visible.sync="sitedialog"
      width="80%"
      :modal="false"
      class="dialogPanel"
    >
      <el-table :data="siteData" :stripe="true" height="350" style="width: 100%">
        <el-table-column prop="householdId" label="序号" width="50"></el-table-column>
        <el-table-column prop="householdName" label="名称" width="100"></el-table-column>
        <el-table-column prop="householdLoc" label="详细地址"></el-table-column>
        <el-table-column prop="householdNum" label="户号" width="80"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" @click="changeSite(scope.row.householdName)" size="mini">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {EventBus} from "../../EventBus";
export default {
  name: "SitePanel",
//   components: {
//     EventBus
//   },
  data() {
    return {
      userId: "1",
      site: "英冠水天城",
      sitedialog: false,
      siteData: []
    };
  },
  methods: {
    addSitePanel() {
      this.sitedialog = true;
      this.getSites();
    },
    changeSite(site) {
      this.site = site;
      EventBus.$emit("changeSite", site);
      this.sitedialog = false;
    },
    getSites() {
      var _self = this;
      this.$axios
        .get(
          "http://localhost:6060/household/getHouseholdByUser/" + _self.userId,
          {
            params: {}
          }
        )
        .then(response => {
          _self.siteData = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {},
  created: function() {}
};
</script>

<style scoped>
.dialogPanel {
  z-index: 1100;
}
</style>