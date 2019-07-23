<style lang="less">
@import "~assets/css/base.less";
#editorUpload {
  height: 0px;
  overflow: hidden;
}
.ql-container.ql-snow {
  height: 300px;
  overflow: auto;
}
.ql-editor {
  padding: 0;
  img {
    display: inline-block;
    vertical-align: bottom;
  }
}
</style>
<template>
  <div>
    <div class="quill-editor" :content="content" @change="onEditorChange($event)" @blur="onEditorBlur($event)" @ready="onEditorReady($event)" v-quill:myQuillEditor="editorOption"> </div>
    <!-- <Upload @handleUploadSuccess="handleEditUploadSuccess" id="editorUpload"></Upload> -->
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload from '~/components/utils/upload2.vue'
export default {
  components: { Upload },
  props: {
    value: {
      type: [String, Array],
      default: ''
    }
  },
  data() {
    return {
      // uploda end
      editorOption: {
        // some quill options
        // 
        // placeholder: '请填写',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{
              'link': function(value) {}
            }, 'image'],
            ['clean'] // remove formatting button
          ]
        }
      },
      myQuillEditor: null,
      setDefault: false,
    };
  },
  created() {},
  methods: {
    handleEditUploadSuccess({ prop, file } = {}) {
      let quill = this.myQuillEditor;
      let length = quill.getSelection().index;
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', file.url);
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    // editor start
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      let self = this;
      self.$emit('input', html);
    },
  },
  mounted() {
    let quill = this.myQuillEditor;
    let toolbar = quill.getModule('toolbar');
    // toolbar.addHandler('image', function(up) {
    //   if (up) {
    //     $("#editorUpload input").trigger('click');
    //   }
    // });
  },
  computed: {
    content() {
      // 空值绑定会循环渲染BUG
      return this.value ? this.value : "<div></div>"
    }
  }
};
</script>