import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.recordList;
  },
  createRecord(record: RecordItem) {
    const recordCopy: RecordItem = clone(record);
    recordCopy.createdAt = recordCopy.createdAt || new Date().toISOString();
    this.recordList.push(recordCopy);
    this.saveRecords();
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
};

recordStore.fetchRecords();

export default recordStore;