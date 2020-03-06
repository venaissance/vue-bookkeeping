<template>
  <Layout>
    <ol class="tags">
      <li>
        <span>吃</span>
        <Icon name="right"></Icon>
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">

  export default {
    name: 'Labels'
  };
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;

    li {
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

  .createTag {
    border-radius: 4px;
    border: none;
    background: #767676;
    color: white;
    padding: 0 16px;
    height: 40px;

    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>
