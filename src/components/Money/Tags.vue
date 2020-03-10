<template>
  <div class="tags">
    <div class="new">
      <button @click="newTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">{{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {
    get tagList() {
      return this.$store.state.tagList;
    }

    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }
  }
</script>

<style lang="scss" scoped>

  .tags {
    font-size: 14px;
    padding: 16px;
    background: white;
    overflow: auto;
    display: flex;
    flex-grow: 1;
    flex-direction: column-reverse;

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