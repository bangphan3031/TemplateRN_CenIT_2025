import FilePickerManager from 'react-native-file-picker';

export async function filePicker(multiple, mediaType) {
  return new Promise(resolve => {
    FilePickerManager.showFilePicker(
      {
        multiple: multiple,
        mediaType: mediaType ? mediaType : 'any',
      },
      response => {
        if (!response.didCancel) {
          resolve(response);
        }
      },
    );
  });
}
