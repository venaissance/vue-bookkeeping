<template>
  <div class="numpad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputNum">1</button>
      <button @click="inputNum">2</button>
      <button @click="inputNum">3</button>
      <button @click="remove">删除</button>
      <button @click="inputNum">4</button>
      <button @click="inputNum">5</button>
      <button @click="inputNum">6</button>
      <button @click="empty">清空</button>
      <button @click="inputNum">7</button>
      <button @click="inputNum">8</button>
      <button @click="inputNum">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputNum">0</button>
      <button @click="inputNum">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumPad extends Vue {
    @Prop() value!: number;
    output = this.value.toString();

    inputNum(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 16) { return; }
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }
      this.output += input;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1)
        ;
      }
    }

    empty() {
      this.output = '0';
    }

    ok() {
      this.$emit('update:value', parseFloat(this.output));
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

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