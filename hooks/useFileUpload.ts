import type { PresignFile } from 'api/types/file/pressignApiType';

type UploadedMetadata = {
  filename: string;
  mimeType: string;
  size: number;
};

export type Uploaded = {
  id: string;
  metadata: UploadedMetadata;
  storage: string;
};

export const useFileUpload = () => {
  const uploadFile = async ({ fields, url }: PresignFile, file: File): Promise<Uploaded> => {
    const keyField = fields.find(({ key }) => key === 'key');

    if (!keyField) {
      throw new Error('Field with key="key" not found');
    }

    const [storage, id] = keyField.value.split('/');

    const formData = new FormData();
    fields.forEach(({ key, value }) => {
      formData.append(key, value);
    });
    formData.append('file', file);

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
  };

  return [uploadFile] as const;
};
