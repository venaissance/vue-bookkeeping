import Vue from 'vue';
import {Component} from 'vue-property-decorator';


@Component
export class TagHelper extends Vue {

  created() {
    this.$store.commit('fetchTags');
  }

  newTag() {
    const name = window.prompt('请输入标签名');
    this.$store.commit('createTag', name);
  }

}


export default TagHelper;