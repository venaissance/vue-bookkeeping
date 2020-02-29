<template>
  <div>
    <router-link to="/money">
      <svg>
        <use xlink:href="#money"/>
      </svg>
      记账
    </router-link>
    |
    <router-link to="/labels">标签</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">
  // svg loader把svg变成symbol标签，再在外面套一个svg标签，最后把svg标签放到body里，用svg+use即可使用
  import x from '@/assets/icons/money.svg';

  console.log(x);
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>

</style>