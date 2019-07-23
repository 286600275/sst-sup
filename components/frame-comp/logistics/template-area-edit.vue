<style lang="less"> .area-check-box {
  margin-left: 60px;
}
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" :close-on-click-modal="false" top="5vh" :title="'区域设置'" :visible.sync="dialogVisible" class="middle-dialog">
      <el-form class="form" label-width="60px" ref="form"> <template v-for="(item,index) in checkMapList">
          <el-form-item :label="item.label">
            <el-checkbox-group class="area-check-box" v-model="checkList[index]">
              <el-checkbox v-for="(check,index2) in item.checks" :label="check" :key="check" :disabled="checkDisabledList[index][index2]"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <div style="padding-left: 180px">
          <el-button @click="submit" type="primary" style="width: 120px;">确定</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  components: {},
  data() {
    this.checkListDefault = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    return {
      util: util,
      dialogVisible: false,
      baoyouArea: false,
      checkMapList: [ //
        { label: "一区", checks: ["湖南"] }, //
        { label: "二区", checks: ["广东", "浙江", "江苏", "上海", "山东", "江西", "湖北", "安徽"] }, //
        { label: "三区", checks: ["福建", "四川", "河北", "河南", "北京", "广西"] }, //
        { label: "四区", checks: ["贵州", "重庆", "云南", "海南"] }, //
        { label: "五区", checks: ["辽宁", "山西", "天津", "陕西", "黑龙江", "吉林"] }, //
        { label: "六区", checks: ["内蒙古", "甘肃", "宁夏", "青海"] }, //
        { label: "七区", checks: ["新疆", "西藏", "香港", "澳门", "台湾"] }, //
      ],
      checkDisabledList: util.clone(this.checkListDefault),
      checkList: util.clone(this.checkListDefault),
      index: null,
    };
  },
  methods: {
    dialogClose() {},
    addAreaItem() {},
    show(row, index, checkedList, baoyou) {
      this.baoyouArea = baoyou;
      this.index = index;
      this.dialogVisible = true;
      let i = 0;
      let checkList = util.clone(this.checkListDefault);
      let checkDisabledList = util.clone(this.checkListDefault);
      for (let item of this.checkMapList) {
        let i2 = 0;
        for (let area of item.checks) {
          if (checkedList.indexOf(area) != -1) {
            checkDisabledList[i][i2] = true;
          }
          if (row.areas.indexOf(area) != -1) {
            checkList[i].push(area);
          }
          i2++;
        }
        i++;
      }
      this.checkList = checkList;
      this.checkDisabledList = checkDisabledList
      if (!row.areas.length) this.checkList = util.clone(this.checkListDefault);
    },
    submit() {
      let checks = [];
      for (let item of this.checkList) {
        if (item.length) {
          checks = checks.concat(item);
        }
      }
      this.$emit('sure-area', checks, this.index, this.baoyouArea)
      this.dialogVisible = false;
    },
  },
  mounted() {}
};
</script>