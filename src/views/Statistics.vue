<template>
  <Layout>
    <!--    <Tab :dataSource="typeList" class-prefix="stat" :value.sync="type"/>-->
    <div class="chart-wrapper" ref="chartWrapper">
      <vue-chart class="chart" :options="x"/>
    </div>

    <ol v-if="groupedList && groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}
          <span>变化{{group.total}}公斤</span>
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
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/lib/typeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import VueChart from '@/components/VueChart.vue';

  @Component({
    components: {VueChart}
  })
  export default class Statistics extends Vue {
    type = '-';
    typeList = typeList;

    mounted() {
      (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
    }

    get x() {
      return {
        grid: {
          left: 0,
          right: 0
        },
        xAxis: {
          type: 'category',
          data: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
          ],
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [{
          data: [
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320, 1, 2
          ],
          type: 'line'
        }],
        tooltip: {
          show: true,
          triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
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
      overflow: auto;
      &::-webkit-scrollbar { // 隐藏滚动条
        display: none;
      }
    }
  }


</style>

