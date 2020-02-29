declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// ts引入非代码文件
declare module "*.svg" {
  const content: string;
  export default content;
}