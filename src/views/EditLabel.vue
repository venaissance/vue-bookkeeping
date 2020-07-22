<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑状态</span>
      <span class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name"
                @update:value="update"
                field-name="状态名"
                placeholder="请输入状态名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除状态</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {

    get currentTag() {
      return this.$store.state.currentTag;
    }

    created() {
      const id = this.$route.params.id;
      this.$store.commit('setCurrentTag', id);
      console.log('currentTag');
      console.log(this.currentTag);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    goBack() {
      this.$router.back();
    }

    update(name: string) {
      this.$store.commit('updateTag', {id: this.currentTag.id, name: name});
      // oldStore.updateTag(this.currentTag.id, name);
    }

    remove() {
      this.$store.commit('removeTag', this.currentTag.id);
    }
  }

</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
    }
    .leftIcon {
      width: 24px;
      height: 24px;
    }
    .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper {
    background: white;
    margin-top: 8px;
  }
  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }

</style>