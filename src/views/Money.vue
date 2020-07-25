<template>
  <Layout class-prefix="layout">
    <NumPad :value.sync="record.amount" @submit="onSaveRecord"/>
    <!--    <Tab :value.sync="record.type" :data-source="typeList"/>-->
    <div class="createdAt">
      <FormItem class="datePicker" type="date" field-name="日期选择" :value.sync="record.createdAt"/>
    </div>
    <div class="notes">
      <FormItem field-name="备注" placeholder="写句话鼓励自己吧~" :value.sync="record.notes"/>
    </div>
    <Tags :value.sync="record.tag"/>
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

    get tagList() {
      // [{"id":"1","name":"空腹"},{"id":"2","name":"饱腹"},{"id":"3","name":"运动后"}]
      return this.$store.state.tagList;
    }

    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      amount: 0,
      type: '-',
      notes: '',
      tag: {id: '', name: ''},
      createdAt: dayjs(new Date()).format('YYYY-MM-DD')
    };

    // 创建时获取记录
    created() {
      this.$store.commit('fetchTags');
      this.$store.commit('fetchRecords');
      this.record.tag = this.tagList[0];
    }

    testDuplicate(record: RecordItem) {
      let flag = false;
      this.recordList.forEach((r: RecordItem) => {
        if (r.createdAt === record.createdAt && JSON.stringify(r.tag) === JSON.stringify(record.tag)) {
          flag = true;
        }
      });
      return flag;
    }

    onSaveRecord() {
      if (this.testDuplicate(this.record)) {
        window.alert('已经记录过了哟');
      } else if (this.record.amount <= 40) {
        window.alert('这么轻，一定是输错了吧');
      } else if (this.record.amount > 100) {
        window.alert('这么重，一定是输错了吧');
      } else {
        this.$store.commit('createRecord', this.record);
        window.alert('体重记录成功，请前往底部导航-数据跟踪查看记录，记得要坚持每天记录哦~');
      }
    }

    @Watch('recordList')
    onRecordListChange() {
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
    max-width: 500px;
    /*background: #f6c646;*/
    /*background: #009bff;*/
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);;
    color: #fff;
  }

</style>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
</style>

