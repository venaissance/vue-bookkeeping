import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';


const store = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
  saveRecord: () => recordListModel.save(),

  // tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: () => {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名重复了');
      } else if (message === 'success') {
        window.alert('添加成功');
      }
    } else {
      window.alert('标签名不能为空');
    }
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  }
};

export default store;