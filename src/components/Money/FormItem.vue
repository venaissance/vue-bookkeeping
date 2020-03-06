<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input type="text" :placeholder="this.placeholder" v-model="value"/>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    value = '';

    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;

    @Watch('value')
    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }
  }
</script>

<style lang="scss" scoped>
  .formItem {
    font-size: 14px;
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
      height: 40px;
      padding-right: 16px;
    }
  }

</style>