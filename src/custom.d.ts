type RecordItem = {
  amount: number;
  type: string;
  notes: string;
  tags: string[];
  createdAt?: Date; // 不强制初始化
}