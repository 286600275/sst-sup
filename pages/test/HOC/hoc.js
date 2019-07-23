export default function Wrapper(baseComp) {
  return {
    data() {
      return {};
    },
    mounted() {},
    render(h) {
      let scopedSlots = {};
      let $slots = this.$slots;
      Object.keys($slots).map((key) => (scopedSlots[key] = () => $slots[key]))
      return h(baseComp, {
        on: this.$listeners,
        attrs: this.$attrs,
        props: this.$props,
        scopedSlots
      })
    }
  }
}