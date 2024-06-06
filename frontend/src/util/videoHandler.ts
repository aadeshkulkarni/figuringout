//Register custom video handler with Quill
const videoHandler = function (this: any) {
  const range = this.getSelection();
  const value = prompt('Please enter YouTube URL:');
  if (value) {
    this.insertEmbed(range.index, 'video', value, 'user');
    this.setSelection(range.index + 1);
  }
};

const modules = {
  toolbar: {
    container: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }], // Add tasklist option
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
};

export { videoHandler, modules };
