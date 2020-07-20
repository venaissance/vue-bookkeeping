<template>
  <div class="wrapper" ref="container"></div>
</template>

<script lang="ts">

  import {Component, Prop, Vue} from 'vue-property-decorator';
  import echarts, {EChartOption} from 'echarts';

  @Component
  export default class VueChart extends Vue {
    @Prop() options?: EChartOption;

    mounted() {
      if (this.options === undefined) {
        return console.error('options is Empty');
      }
      const chart = echarts.init(this.$refs.container as HTMLDivElement);
      chart.setOption(this.options);
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 400px;
  }
</style>