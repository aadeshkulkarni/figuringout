  //Register custom video handler with Quill
  export const videoHandler = function (this: any) {
    const range = this.getSelection();
    const value = prompt('Please enter YouTube URL:');
    if (value) {
      this.insertEmbed(range.index, 'video', value, 'user');
      this.setSelection(range.index + 1);
    }
  };