<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里添加备注" v-model="x"/>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    x = '';
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    padding-left: 20px;

    .name {
      padding-right: 20px;
    }

    input {
      background: transparent;
      border: none;
      flex-grow: 1;
      height: 64px;
      padding-right: 16px;
    }
  }

</style>