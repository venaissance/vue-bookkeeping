<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected: selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">{{tag}}
      </li>
    </ul>
    <div class="new">
      <button @click="newTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop() dataSource: string[] | undefined;
    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    }

    newTag() {
      const name = window.prompt('请输入标签名')!;
      if (name === '') {
        alert('标签不能为空哦~');
      } else if (this.dataSource && this.dataSource.includes(name)) {
        alert('标签已存在，请重新输入~');
      } else if (this.dataSource) {
        this.$emit('update:dataSource', [...this.dataSource, name]);
      }
    }
    
  }
</script>

<style lang="scss" scoped>

  .tags {
    font-size: 14px;
    padding: 16px;

    .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: #d9d9d9;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        background: $bg;

        &.selected {
          background: darken($bg, 30%);
          color: white;
        }
      }
    }

    .new {
      margin-top: 16px;

      > button {
        border: none;
        background: transparent;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }


</style>