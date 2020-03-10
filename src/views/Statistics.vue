<template>
  <Layout>
    <Tab :dataSource="typeList" class-prefix="stat" :value.sync="type"/>
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/lib/typeList';


  @Component
  export default class Statistics extends Vue {
    type = '-';
    typeList = typeList;

    created() {
      this.$store.commit('fetchRecords');
    }

    tagString(tag: Tag[]) {
      return tag.length === 0 ? '无' : tag.map(t => t.name).join('，');
    }

    get recordList() {
      return this.$store.state.recordList;
    }


    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string; items: RecordItem[] }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      console.log(hashTable);
      return hashTable;
    }


  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

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

</style>

