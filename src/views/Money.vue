<template>
  <Layout class-prefix="layout">
    <div class="numpad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里添加备注"/>
      </label>
    </div>
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
      </ul>
      <div class="new">
        <button>新增标签</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">


  export default {
    name: 'Money'
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tags {
    font-size: 14px;
    padding: 16px;

    .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        background: #d9d9d9;
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

  .notes {
    font-size: 14px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    padding-left: 20px;

    .name {
      padding-right: 20px;
    }

    input {
      background: transparent;
      border: none;
      flex-grow: 1;
      height: 64px;
      padding-right: 16px;
    }
  }

  .types {
    display: flex;
    background-color: #c4c4c4;
    font-size: 24px;
    text-align: center;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        width: 100%;
        background-color: #333;
      }
    }
  }


  .numpad {
    .output {
      @extend %clearFix;
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      text-align: right;
      padding: 9px 16px;
      height: 72px;
    }

    .buttons {
      @extend %clearFix;

      > button {
        height: 64px;
        width: 25%;
        border: none;
        float: left;
        background: transparent;

        &.ok {
          height: 64*2px;
          float: right;
        }

        &.zero {
          width: 25*2%;
        }

        $bg: #f2f2f2;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 2*4%);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 3*4%);
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }

        &:nth-child(14) {
          background: darken($bg, 5*4%);
        }

        &:nth-child(12) {
          background: darken($bg, 6*4%);
        }
      }
    }
  }

</style>

