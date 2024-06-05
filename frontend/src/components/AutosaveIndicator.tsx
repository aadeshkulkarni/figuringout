import React from 'react';

interface Props {
  lastSaved: number | null;
  isSaving: boolean;
  userName: string;
}

const AutosaveIndicator: React.FC<Props> = ({ lastSaved, isSaving, userName }) => {
  const style = {
    font: "noto-serif",
    position: 'absolute' as 'absolute',
    top: '100',
    left: '152',
    transform: 'translateY(-65%)', // Move it above the title
    color: '#888',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap' as 'nowrap', // Prevent text from wrapping
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
        <span style={{ fontWeight: 'bold', color: '#333' }}>Draft in {userName}</span>
      <span>·</span>
      <span>{statusText}</span>
    </div>
  );
};

export default AutosaveIndicator;