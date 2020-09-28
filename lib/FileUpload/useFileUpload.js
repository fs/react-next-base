export const useFileUpload = () => {
  const uploadFile = async ({ fields, url }, file) => {
    if (fields.length > 0 && url) {
      const [storage, id] = fields.find(({ key }) => key === 'key').value.split('/');

      const formData = new FormData();
      fields.forEach(({ key, value }) => {
        formData.append(key, value);
      });
      formData.append('file', file);

      try {
        await fetch(url, {
          method: 'POST',
          body: formData,
        });
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
