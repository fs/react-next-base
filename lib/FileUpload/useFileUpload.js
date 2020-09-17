import FileUploadService from './FileUploadService';

export const useFileUpload = () => {
  const fileUploadService = new FileUploadService();
  const uploadFile = async ({ fields, url }, file) => {
    if (fields.length > 0 && url) {
      const [storage, id] = fields.find(({ key }) => key === 'key').value.split('/');

      const formData = new FormData();
      fields.forEach(({ key, value }) => {
        formData.append(key, value);
      });
      formData.append('file', file);

      try {
        await fileUploadService.post(url, formData);
        return {
          storage,
          id,
          metadata: {
            size: file.size,
            filename: file.name,
            mimeType: file.type,
          },
        };
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return undefined;
  };

  return [uploadFile];
};
