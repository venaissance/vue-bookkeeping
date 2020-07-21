<template>
  <div id="app">
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
    color: #313131;
    background: #f5f5f5;
  }
  #app {
    max-width: 500px;
    margin: 0 auto;
  }

</style>
