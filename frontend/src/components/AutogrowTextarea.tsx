import React from 'react';

const AutogrowTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // This handles textarea to grow its height based on the content
    const target = e.target as HTMLTextAreaElement;

    // Reset field height
    target.style.height = 'auto';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(target);

    // Calculate the height without the extra blank line
    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      target.scrollHeight -
      parseInt(computed.getPropertyValue('padding-bottom'), 10) -
      parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    target.style.height = `${height}px`;
  };

  return <textarea {...props} onKeyDown={handleKeyDown}></textarea>;
};

export default AutogrowTextarea;
