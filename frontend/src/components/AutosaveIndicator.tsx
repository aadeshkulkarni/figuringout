import React from 'react';

interface Props {
  lastSaved: number | null;
  isSaving: boolean;
  userName: string;
}

const AutosaveIndicator: React.FC<Props> = ({ lastSaved, isSaving, userName }) => {
  const style = {
    font: "noto-serif",
    position: 'fixed' as 'fixed',
    top: '100px',
    left: '152px',
    color: '#888',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const getStatusText = () => {
    if (isSaving) return 'Saving...';
    if (lastSaved) return 'Saved';
    return null;
  };

  const statusText = getStatusText();
  if (!statusText) return null;

  return (
    <div style={style}>
        <span style={{ fontWeight: 'bold', color: '#333' }}>Draft in </span>
      <span style={{ fontWeight: 'bold', color: '#333' }}>{userName}</span>
      <span>·</span>
      <span>{statusText}</span>
    </div>
  );
};

export default AutosaveIndicator;