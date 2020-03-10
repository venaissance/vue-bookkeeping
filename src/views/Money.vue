<template>
  <Layout class-prefix="layout">
    <NumPad :value.sync="record.amount" @submit="onSaveRecord"/>
    <Tab :value.sync="record.type" :data-source="typeList"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
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
      tags: []
    };

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    // 创建时获取记录
    created() {
      this.$store.commit('fetchRecords');
    }

    onSaveRecord() {
      // oldStore.createRecord(this.record);
      this.$store.commit('createRecord', this.record);
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
</style>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
</style>

