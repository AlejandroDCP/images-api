import { useState, useRef, useEffect } from 'react';
import { uploadImageService } from '../../services/uploadImage';

const useUploadImage = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 10000);
      return () => clearTimeout(timer);
    }, [message]);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) { setImage(file); }
    };
  
    const cleanImage = () => {
      setImage(null);
      fileInputRef.current.value = '';
    };
  
  
    const onSubmit = async () => {
      if (image) {
        setIsLoading(true)
        const data = await uploadImageService(image)
        setImage(null)
        setMessage(data.message)
        setIsLoading(false)
      }
    }
  
    return {
        image,
        message,
        isLoading,
        fileInputRef,
        handleImageChange,
        cleanImage,
        onSubmit,
    };
}
 
export default useUploadImage;