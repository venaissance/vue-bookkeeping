<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumPad :value.sync="record.amount"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumPad from '@/components/Money/NumPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';

  type Records = {
    amount: number;
    type: string;
    notes: string;
    tags: string[];
  }

  @Component({
    components: {NumPad, Types, Notes, Tags}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行', '彩票'];

    record: Records = {
      amount: 0,
      type: '-',
      notes: '',
      tags: []
    };

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }
    
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
</style>

