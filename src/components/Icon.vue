<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name"/>
  </svg>
</template>

<script lang="ts">
  // svg loader把svg变成symbol标签，再在外面套一个svg标签，最后把svg标签放到body里，用svg+use即可使用
  // 导入整个icon文件夹中的.svg文件
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {requireContext.keys().forEach(requireContext);};
  try {
    importAll(require.context('../assets/icons', true, /\.svg$/));
  } catch (e) {
    console.log(e);
  }

  export default {
    name: 'Icon',
    props: ['name']
  };
</script>

<style lang="scss" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>