const API_URL = 'http://localhost:5000/'

export const uploadImageService = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch(API_URL + 'images/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            return { message:'Error al subir la imagen' };
        }

        const data = await response.json();

        return { ...data, message: 'Imagen subida correctamente' }
        
    } catch (error) {

        console.error('Error al subir la imagen:', error);
        return { message:'Error al subir la imagen' };
    }
}
