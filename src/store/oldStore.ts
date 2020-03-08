import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const oldStore = {
  ...recordStore,
  ...tagStore
};

export default oldStore;