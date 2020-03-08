<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumPad :value.sync="record.amount" @submit="onSaveRecord"/>
    <Types :value.sync="record.type"/>
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
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem, NumPad, Types, Tags},
  })
  export default class Money extends Vue {
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

