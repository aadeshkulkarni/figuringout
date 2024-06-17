import { STORAGE_KEY } from '../util/storage-keys';
import useTimerInterval from './useTimerInterval';
import { useState } from 'react';
interface Content {
  title: string;
  content: string;
}

const useAutoSaveDraft = (name: string, getDraft: () => Content) => {
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const userJSON = localStorage.getItem('user') || '{}';
  const user = JSON.parse(userJSON);

  useTimerInterval(15000, autoSaveHandler);

  async function autoSaveHandler() {
    setIsSaving(true);
    const draft = { ...getDraft() };
    const currentDrafts = readDraftFromLocalStorage();
    currentDrafts[name] = draft;
    currentDrafts[name] = undefined;
    localStorage.setItem(STORAGE_KEY.WRITE_DRAFT(user.id), JSON.stringify(currentDrafts));
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLastSaved(Date.now());
    setIsSaving(false);
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
    lastSaved,
    isSaving,
    userName: user.name || 'User',
  };
};

export default useAutoSaveDraft;
