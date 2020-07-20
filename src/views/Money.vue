<template>
  <Layout class-prefix="layout">
    <NumPad :value.sync="record.amount" @submit="onSaveRecord"/>
    <!--    <Tab :value.sync="record.type" :data-source="typeList"/>-->
    <div class="createdAt">
      <FormItem type="date" field-name="日期" placeholder="在这里输入日期" :value.sync="record.createdAt"/>
    </div>
    <div class="notes">
      <FormItem field-name="备注" placeholder="写句话鼓励自己吧~" :value.sync="record.notes"/>
    </div>
    <Tags :value.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumPad from '@/components/Money/NumPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Button from '@/components/Button.vue';
  import typeList from '@/lib/typeList';
  import dayjs from 'dayjs';

  @Component({
    components: {Button, FormItem, NumPad, Tags},
  })
  export default class Money extends Vue {
    typeList = typeList;

    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      amount: 0,
      type: '-',
      notes: '',
      tags: [],
      createdAt: dayjs(new Date()).format('YYYY-MM-DD')
    };

    // 创建时获取记录
    created() {
      this.$store.commit('fetchRecords');
    }

    onSaveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        window.alert('请至少选择一个状态哦~');
      } else {
        this.$store.commit('createRecord', this.record);
        window.alert('体重记录成功，请前往底部导航-数据跟踪查看记录，记得要坚持每天记录哦~');
      }
    }

    @Watch('recordList')
    onRecordListChange() {
      // oldStore.saveRecords();
      this.$store.commit('saveRecords');
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
  .createdAt {
    position: fixed;
    top: 0;
    width: 100vw;
    background: #f6c646;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
</style>

