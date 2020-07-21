<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <template v-if="type === 'date'">
        <input :type="type" :placeholder="placeholder"
               :value="dateReformat(value)"
               @input="onValueChanged($event.target.value)"
        />
      </template>
      <template v-else>
        <input :type="type || 'text'" :placeholder="placeholder"
               :value="value"
               @input="onValueChanged($event.target.value)"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class FormItem extends Vue {

    @Prop({default: ''}) readonly value!: string;
    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;
    @Prop() type?: string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }

    dateReformat(isoString: string) {
      console.log(dayjs(isoString).format('YYYY-MM-DD'));
      return dayjs(isoString).format('YYYY-MM-DD');
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