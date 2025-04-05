
// This is a mock file upload service
// In a real application, this would use Supabase Storage or an API

export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // In a real app, this would return a URL to the uploaded file
          // Here, we're returning the data URL representation of the image
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
      
      reader.readAsDataURL(file);
    });
  }
};
