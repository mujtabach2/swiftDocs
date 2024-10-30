import tinymce from 'tinymce/tinymce'; // If using npm

tinymce.init({
  selector: '#myTextarea', // Change this to the ID of your textarea
  menubar: false,           // Removes the menu bar for a cleaner look
  plugins: 'lists link image preview', // Load any necessary plugins
  toolbar: 'undo redo | formatselect | bold italic | bullist numlist | link image', // Customizes toolbar
  setup: (editor) => {
    editor.on('init', () => {
      console.log('Editor initialized');
    });
  }
});
