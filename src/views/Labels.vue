<template>
  <Layout>
    <div class="tags">
      <router-link class="tag"
                   v-for="tag in tags"
                   :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import Button from '@/components/Button.vue';

  tagListModel.fetch();
  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {
    tags = tagListModel.data;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
          window.alert('标签重复了');
        } else if (message === 'success') {
          window.alert('添加成功');
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;

    .tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      border-bottom: 1px solid #e6e6e6;
      min-height: 44px;
    }

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }

  .createTag-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>
