<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['classPrefix'],
    name: 'Layout'
  };
</script>

<style lang="scss" scoped>
  Nav {
    /*background-color: #fff;*/
  }
  .layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .content {
    flex-grow: 1;
    overflow: auto;
    background-color: #fff;
  }
</style>