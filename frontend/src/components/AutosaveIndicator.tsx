import React from 'react';

interface Props {
  lastSaved: number | null;
  isSaving: boolean;
  userName: string;
}

const AutosaveIndicator: React.FC<Props> = ({ lastSaved, isSaving, userName }) => {
  const getStatusText = () => {
    if (isSaving) return 'Saving...';
    if (lastSaved) return 'Saved';
    return null;
  };

  const statusText = getStatusText();
  if (!statusText) return null;

  return (
    <div className="h-8 max-h-8 text-gray-500 dark:text-sub text-xs flex items-center gap-2 whitespace-nowrap md:mt-2">
      <span className="font-semibold text-gray-800 dark:text-sub">Draft in {userName}</span>
      <span>·</span>
      <span>{statusText}</span>
    </div>
  );
};

export default AutosaveIndicator;
