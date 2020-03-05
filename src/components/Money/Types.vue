<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    @Prop() value!: string;
    type = this.value;

    selectType(type: string) {
      if (type !== '+' && type !== '-') {
        throw new Error('type is Unknown');
      } else {
        this.type = type;
      }
      this.$emit('update:value', type);
    }

  }
</script>

<style lang="scss" scoped>

  .types {
    display: flex;
    background-color: #c4c4c4;
    font-size: 24px;
    text-align: center;

    > li {
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