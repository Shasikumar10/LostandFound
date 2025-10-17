import { generateId } from "@/lib/utils";

class UploadService {
  async uploadImage(file: File): Promise<string> {
    // In a real app, this would upload to a server or cloud storage
    // For this demo, we'll simulate a delay and return a placeholder URL
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate a fake URL for the image
    const imageId = generateId();
    return `https://picsum.photos/seed/${imageId}/800/600`;
  }
}

export const uploadService = new UploadService();