<template>
  <Layout class="page">
    <!--    <Tab :dataSource="typeList" class-prefix="stat" :value.sync="type"/>-->
    <div class="header">体重变化</div>
    <div class="chart-wrapper" ref="chartWrapper">
      <vue-chart class="chart" :options="chartOptions"/>
    </div>

    <div class="details">
      <ol v-if="groupedList && groupedList.length > 0">
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}}
            <!--          <span>变化{{group.total}}公斤</span>-->
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>{{item.amount}}公斤</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noRecords">
        <!--      主人太懒了，连一条{{type==='-'?'支出':'收入'}}记录都没有-->
      </div>
    </div>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/lib/typeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import VueChart from '@/components/VueChart.vue';
  import _ from 'lodash';

  @Component({
    components: {VueChart}
  })
  export default class Statistics extends Vue {
    type = '-';
    typeList = typeList;

    mounted() {
      // 初始滚动条滑到最右边
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    get chartDataList() {
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; ++i) {
        // this.recordList = [{date: 7.20, value: 100}]
        const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.recordList, {
          createdAt: dateString
        });
        console.log(found);
        array.push({date: dateString, value: found ? found.amount : 0});
      }
      array.sort((a, b) => {
        if (a.date > b.date) return 1;
        else if (a.date === b.date) return 0;
        else return -1;
      });
      return array;
    }

    get chartOptions() {
      const keys = this.chartDataList.map(item => item.date.substr(5));
      const values = this.chartDataList.map(item => item.value);
      return {
        grid: {
          left: 10,
          right: 30
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true},
          axisLine: {
            lineStyle: {
              // color: 'rgba(98, 200, 168)'
              color: '#009bff'
            }
          },
        },
        yAxis: {
          type: 'value',
          show: true,
          position: 'right',
          name: '单位：公斤',
          min: 50,
          max: 100,
          axisLine: {
            lineStyle: {
              // color: 'rgba(98, 200, 168)'
              color: '#009bff'
            }
          },
        },
        series: [{
          symbol: 'circle',
          data: values,
          type: 'line',
          smooth: true,
          symbolSize: 12,
          itemStyle: {
            borderWidth: 1,
            // color: 'rgba(98, 200, 168)'
            color: '#009bff'
          }
        }],
        tooltip: {
          trigger: 'axis',
          show: true,
          position: 'top',
          triggerOn: 'click',
          formatter: '{c} KG',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            label: 'cross',
            show: true,
          },
        }
      };
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    tagString(tag: Tag[]) {
      return tag.length === 0 ? '无' : tag.map(t => t.name).join('，');
    }

    get recordList() {
      return this.$store.state.recordList;
    }

    get groupedList() {
      const {recordList} = this;
      if (!recordList || recordList.length === 0) {return [];}

      const newList = clone(recordList)
        .filter((r: { type: string }) => r.type === this.type)
        .sort((a: { createdAt: string }, b: { createdAt: string }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

      type Result = { title: string; total?: number; items: RecordItem[] }[]
      if (newList.length && newList.length > 0) {
        const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
        for (let i = 1; i < newList.length; i++) {
          const current = newList[i];
          const last = result[result.length - 1];
          if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
            last.items.push(current);
          } else {
            result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
          }
        }
        result.map(group => {
          group.total = group.items.reduce((sum, item) => {
            return sum + item.amount;
          }, 0);
        });
        return result;
      } else {
        return [];
      }
    }

    beautify(date: string) {
      const day = dayjs(date);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else {
        return day.format('YYYY年M月D日');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
  .page {
    overflow: hidden;
  }
  .details {
    overflow: auto;
  }
  ::v-deep li.stat-tabItem {
    height: 48px;
    font-family: $font-hei;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .noRecords {
    text-align: center;
    padding: 50px 20px;
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    @extend %item;
  }
  .record {
    @extend %item;
    background: white;
    border-bottom: 1px solid #e6e6e6;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  .chart {
    width: 430%;
    &-wrapper {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.24);
      overflow: auto;
      &::-webkit-scrollbar { // 隐藏滚动条
        display: none;
      }
    }
  }
  .header {
    position: fixed;
    top: 0;
    width: 100vw;
    max-width: 500px;
    min-height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background: transparent;
    font-family: $font-hei;
    color: black;
  }


</style>

