<style scoped> /**/
.service-item{
  margin-bottom: 10px;
}
.t-top {
  height: 60px;
  line-height: 30px;
  padding: 10px;
  border: 1px solid #EBEEF5;
  background: #fff;
  border-bottom: 0px;
 
}  

.t-top .t-title{
    font-weight: bold;
  }
.return-address-item {
  width: 600px;
   
}
.kefu-item{
  width: 800px;
}
.service-item .c-top-btn{
    float: right;
    margin-top: 2px;
  }
</style>
<template>
  <div>
    <div class="return-address-item service-item">
      <div class="t-top"><span class="t-title">退货地址</span>
        <el-button @click="editReturnAddress" class="c-top-btn" type='primary' size="small">编辑</el-button>
      </div>
      <div class="table-container">
        <el-table :show-header="false" size="small" tooltip-effect="light" :data="returnAddressData" border>
          <el-table-column prop="label" :formatter="util.tableRender()" width="100px">
          </el-table-column>
          <el-table-column prop="value" :show-overflow-tooltip="true" :formatter="util.tableRender()">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="kefu-item service-item">
      <div class="t-top"><span class="t-title">微信客服</span>
        <el-button @click="editCustomer(null,1)" class="c-top-btn" type='primary' size="small">添加客服</el-button>
      </div>
      <div class="table-container">
        <el-table size="small" tooltip-effect="light" :data="weChatCustomerData" border>
          <el-table-column label="客服微信号" prop="number" :formatter="util.tableRender()" width="200px">
          </el-table-column>
          <el-table-column label="客服备注" prop="info" :show-overflow-tooltip="true" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button @click="editCustomer(scope.row)" type='primary' size="mini">编辑</el-button>
              <el-button @click="deleteCustomer(scope.row)" type='danger' size="mini">删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class=" kefu-item service-item">
      <div class="t-top"><span class="t-title">电话客服</span>
        <el-button @click="editCustomer(null,2)" class="c-top-btn" type='primary' size="small">添加客服</el-button>
      </div>
      <el-table size="small" tooltip-effect="light" :data="telCustomerData" border>
        <el-table-column label="客服电话号" prop="number" :formatter="util.tableRender()" width="200px">
        </el-table-column>
        <el-table-column label="客服备注" prop="info" :show-overflow-tooltip="true" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button @click="editCustomer(scope.row)" type='primary' size="mini">编辑</el-button>
            <el-button @click="deleteCustomer(scope.row)" type='danger' size="mini">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ReturnAddressEdit @address-edit-success="getRefundAddress" ref="returnAddressEdit"></ReturnAddressEdit>
    <CustomerEdit @customer-edit-success="renderCustomData" ref="customerEdit"></CustomerEdit>
  </div>
</template>
<script>
import util from '~/utils/common'
import ReturnAddressEdit from '~/components/frame-comp/customer-service/return-address-edit'
import CustomerEdit from '~/components/frame-comp/customer-service/customer-edit'
export default {
  props: [],
  components: { ReturnAddressEdit, CustomerEdit },
  data() {
    return {
      util: util,
      returnAddress: {
        id: '',
        refund_person: "",
        refund_address: "",
        refund_phone: "",
      },
      customData: [],
      weChatCustomerData: [],
      telCustomerData: [],
    }
  },
  watch: {
    customData: function(data) {
      data = util.clone(data);
      this.weChatCustomerData = [];
      this.telCustomerData = [];
      for (let item of data) {
        if (item.type == 1) {
          this.weChatCustomerData.push(item);
        } else {
          this.telCustomerData.push(item);
        }
      }
    }
  },
  methods: {
    deleteCustomer(row) {
      let self = this;
      self.$confirm('确定删除该客服吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除接口 
        util.ajax({
          type: "DELETE",
          url: util.ajaxPath() + "/custom/destroy/" + row.id,
          success: function(res) {
            if (res.status == "success") {
              util.message.success('客服删除成功！')
              self.renderCustomData();
            }
          }
        })
      }).catch(() => {});
    },
    editCustomer(row, type) {
      this.$refs['customerEdit'].show(row, type)
    },
    editReturnAddress() {
      this.$refs['returnAddressEdit'].show(util.clone(this.returnAddress))
    },
    /**
     * 获取退货地址信息
     * @return {[type]} [description]
     */
    getRefundAddress() {
      let self = this;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/refund/address",
        success: function(res) {
          if (res.status == "success") {
            self.returnAddress = res.data;
            if (!res.data.id || !res.data.refund_address) {
              self.$alert('为保证功能完整，请填写退货地址', '提示', {
                type: 'warning',
                confirmButtonText: '确定',
                callback: action => {}
              });
            } else {
              self.$store.commit('updateRefundAddress', res.data)
            }
          }
        }
      })
    },
    /**
     * 获取客服信息
     * @return {[type]} [description]
     */
    renderCustomData() {
      let self = this;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/custom/index",
        success: function(res) {
          if (res.status == "success") {
            self.customData = res.data;
          }
        }
      })
    },
  },
  mounted() {
    this.getRefundAddress();
    this.renderCustomData();
  },
  computed: {
    returnAddressData() {
      return [{
        label: "收货人",
        value: this.returnAddress.refund_person,
      }, {
        label: "收货地址",
        value: this.returnAddress.refund_address,
      }, {
        label: "收货电话",
        value: this.returnAddress.refund_phone,
      }]
    },
  },
  head: {},
  layout: 'frame'
}
</script>