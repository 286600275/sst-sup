<style lang="less"> .bank-card{
  width: 360px;
  float: left;
  margin: 0 10px 10px;
  height: 120px;
  cursor: pointer;
  .bank-card-numb{
    font-size: 16px;
  }
}
.bank-card-add{

  i{
    font-size: 34px;
    color: #999;
    line-height: 78px;
    width: 38px;
    display: block;
    margin: 0 auto;
  }
}
.bank-icon{
    font-size: 24px;
    line-height: 16px;
    position: relative;
    margin-right: 10px;
    top: 4px;
  }
</style>
<template>
  <div>
    <el-dialog width="800px" title="我的银行卡" :visible.sync="dialogVisible" top="8vh" :close-on-click-modal="false">
      <template v-for="item in bankCardList">
        <el-card class="box-card bank-card" shadow="hover" @click.native="editBankCard(item)">
          <div slot="header" class="clearfix">
            <span><i :class="['bank-icon','iconfont',util.keyVals.bankIconClassMap[item.bank_name]]"></i>{{item.bank_name}}</span>
            <el-button @click.stop="deleteBankCard(item)" style="float: right; padding: 3px 0" type="text">删除</el-button>
          </div>
          <div><span class="bank-card-numb"> {{item.card_number | bankCardShow}}</span> </div>
        </el-card>
      </template>
      <el-card @click.native="editBankCard()" class="box-card bank-card bank-card-add" shadow="hover">
        <div> <i class="el-icon-plus"></i></div>
      </el-card>
      <span class="clear-f"></span>
    </el-dialog>
    <BankCardAdd @bank-card-add-success="getBankCardList()" ref="bankCardAdd"></BankCardAdd>
  </div>
</template>
<script>
import util from '~/utils/common'
import BankCardAdd from '~/components/frame-comp/finance/bank-card-add'
export default {
  components: { BankCardAdd },
  props: [],
  data() {
    return {
      util: util,
      dialogVisible: false,
      bankCardList: [],
    }
  },
  methods: {
    editBankCard(row) {
      this.$refs['bankCardAdd'].show(row);
    },
    deleteBankCard(item) {
      let self = this;
      let cardN = item.card_number + '';
      let lastCardN = cardN.substr(cardN.length - 6);
      self.$confirm('确定删除尾号为' + lastCardN + '的银行卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        util.ajax({
          type: "DELETE",
          url: util.ajaxPath() + "/card/del/" + item.id,
          success: function(res) {
            if (res.status == "success") {
              util.message.success('银行卡删除成功');
              self.getBankCardList();
            }
          }
        })
      }).catch(() => {})
    },
    submit() {},
    getBankCardList() {
      let self = this;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/card/index",
        success: function(res) {
          if (res.status == "success") {
            self.bankCardList = res.data;
          } else {}
        }
      })
    },
    show(row) {
      let self = this;
      self.dialogVisible = true;
      self.getBankCardList();
    }
  },
  mounted() {},
  computed: {},
  filters: {
    bankCardShow(val) {
      val += "";
      let hideL = val.length - 6;
      return new Array(hideL).join("*") + val.substr(hideL);
    }
  },
  head: {}
}
</script>