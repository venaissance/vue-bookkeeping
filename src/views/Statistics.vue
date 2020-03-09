<template>
  <Layout>
    <Tab class-prefix="stat"
         :data-source="typeList"
         :value.sync="type"/>
  </Layout>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/lib/typeList';

  @Component
  export default class Statistics extends Vue {
    typeList = typeList;
    type = '-';
  }
</script>

<style lang="scss" scoped>
  ::v-deep li.stat-tabItem {
    background: #c4c4c4;
    height: 48px;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }
</style>

