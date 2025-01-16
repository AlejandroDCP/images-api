import '../../index.css';
import useUploadImage from './useUploadImage';

const UploadImage = () => {
  const {
    image,
    message,
    isLoading,
    fileInputRef,
    handleImageChange,
    cleanImage,
    onSubmit,
  } = useUploadImage();

  return (
    <>
      {isLoading ? <h2 className='loading'>loading...</h2> :
        (
          <>
            <h1 className='title'>Upload Image</h1>
            <div className='container'>
              <label htmlFor="file-upload" className='upload-button'>
                Selecciona una imagen
              </label>
              <input
                type="file"
                className='hidden-input'
                id="file-upload"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />

              {message ? <p className='message'>{message}</p> : null}

              {image ? (
                <div className='image-container'>
                  <span onClick={cleanImage} className='remove-image'>&#10005;</span>
                  <img src={URL.createObjectURL(image)} alt="Vista previa" className='image' />
                  <button onClick={onSubmit} className='upload-button'>Enviar</button>
                </div>
              ) : null}
            </div>
          </>
        )}
    </>
  );
}

export default UploadImage;
