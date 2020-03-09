<template>
  <Layout>
    <Tab class-prefix="stat"
         :data-source="typeList"
         :value.sync="type"/>
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span>{{item.notes}}</span>
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
    typeList = typeList;
    type = '-';

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      console.log(recordList);
      type HashTableValue = { title: string; items: RecordItem[] }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      console.log(hashTable);
      return hashTable;
    }

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
  }
</script>

<style lang="scss" scoped>
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: white;
    @extend %item;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }


  ::v-deep li.stat-tabItem {
    background: #c4c4c4;
    height: 48px;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }
</style>

