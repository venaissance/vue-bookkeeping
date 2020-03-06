<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "~@/assets/styles/helper.scss";
  @import "~@/assets/styles/reset.scss";

  body {
    line-height: 1.5;
    font-family: $font-hei;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    color: #333;
    background: #f5f5f5;
  }

</style>
