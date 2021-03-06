type RecordItem = {
  amount: number;
  type: string;
  notes: string;
  tag: Tag;
  createdAt: string; // 不强制初始化
}

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}

type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'duplicated' | 'success';
  update: (id: string, name: string) => 'duplicated' | 'not found' | 'success';
  remove: (id: string) => boolean;
  save: () => void;
}

