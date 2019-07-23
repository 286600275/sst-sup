<style lang="less">
@import "~assets/css/base.less";
#box {
  position: relative;
  height: 150px;
  width: 150px;
  margin: 50px;
  padding: 10px;
  border: 1px solid black;
  // perspective: 150;  
}
#box2 {
  width: 600px;
  height: 400px;
  position: absolute;
  left: 200px;
  top: 200px;
  padding: 50px;
  position: absolute;
  border: 1px solid black;
  background-color: red;
  transform: rotateX(45deg);
  -webkit-transform: rotateX(45deg);
}
</style><template>
  <div>
    <div id="box">
      <div id="box2"></div>
    </div>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: [],
  components: {},
  created() {},
  data() {
    return {
      pwdChoised: false
    }
  },
  watch: {},
  methods: {},
  mounted() {},
  computed: {},
  head: {},
  layout: 'login'
}
</script>