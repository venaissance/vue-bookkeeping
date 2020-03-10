<template>
  <div>
    <ul class="types">
      <li v-for="item in dataSource" :key="item.value"
          class="types-item"
          :class="{selected: value === `${item.value}`, [classPrefix+'-tabItem']: classPrefix}"
          @click="selectType(item)">{{item.text}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = {
    text: string; value: string;
  };
  @Component
  export default class Tab extends Vue {
    @Prop() classPrefix?: string;
    @Prop() value!: string;
    @Prop() dataSource!: DataSourceItem[];

    selectType(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>

  .types {
    display: flex;
    background-color: #c4c4c4;
    font-size: 24px;
    text-align: center;

    &-item {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        width: 100%;
        background-color: #333;
      }
    }
  }
</style>