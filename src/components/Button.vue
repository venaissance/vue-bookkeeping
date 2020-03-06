<template>
  <button class="button" @click="$emit('click', $event)">
    <slot/>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {
  }
</script>

<style lang="scss" scoped>
  .button {
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