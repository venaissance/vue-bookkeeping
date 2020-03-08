import Vue from 'vue';
import {Component} from 'vue-property-decorator';


@Component
export class TagHelper extends Vue {

  created() {
    this.$store.commit('fetchTags');
  }

  newTag() {
    this.$store.commit('createTag');
  }

}


export default TagHelper;