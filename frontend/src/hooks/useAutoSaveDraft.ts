import { STORAGE_KEY } from '../util/storage-keys';
import useTimerInterval from './useTimerInterval';

interface Content {
  title: string;
  content: string;
}

const useAutoSaveDraft = (name: string, getDraft: () => Content) => {
  const userJSON = localStorage.getItem('user') || '{}';
  const user = JSON.parse(userJSON);

  useTimerInterval(15000, autoSaveHandler);

  function autoSaveHandler() {
    const draft = { ...getDraft() };
    const currentDrafts = readDraftFromLocalStorage();
    currentDrafts[name] = draft;
    currentDrafts[name] = undefined
    localStorage.setItem(STORAGE_KEY.WRITE_DRAFT(user.id), JSON.stringify(currentDrafts));
  }

  function readDraftFromLocalStorage() {
    const draftsJSON = localStorage.getItem(STORAGE_KEY.WRITE_DRAFT(user.id));
    if (draftsJSON) {
      return JSON.parse(draftsJSON);
    } else return {};
  }

  function getDraftHandler() {
    const drafts = readDraftFromLocalStorage();
    return drafts[name];
  }

  function deleteDraft() {
    const drafts = { ...readDraftFromLocalStorage() };
    drafts[name] = undefined;

    localStorage.setItem(STORAGE_KEY.WRITE_DRAFT(user.id), JSON.stringify(drafts));
  }

  return {
    get draft() {
      return getDraftHandler();
    },
    deleteDraft,
  };
};

export default useAutoSaveDraft;
