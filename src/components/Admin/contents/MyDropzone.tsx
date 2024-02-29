import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

const MyDropzone = () => {
   const onDrop = useCallback((acceptedFiles: File[]) => {
      const formData = new FormData();
      acceptedFiles.forEach((file: string | Blob) => {
         formData.append('images', file);
      });

      console.log(formData);

      // Aqui você pode adicionar os outros campos do formulário ao formData
      // e então fazer o upload para o servidor
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

   return (
      <div {...getRootProps()}>
         <input {...getInputProps()} />
         {isDragActive ? (
            <p>Arraste os arquivos aqui...</p>
         ) : (
            <p>Clique ou arraste os arquivos para esta área</p>
         )}
      </div>
   );
};

export default MyDropzone;
