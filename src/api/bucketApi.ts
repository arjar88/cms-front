import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const uploadFilesToServer = async (
  endpoint: string,
  data: FormData
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

const handleFileUpload = async (
  selectedFiles: FileList,
  additionalData: { [key: string]: string }
) => {
  const formData = new FormData();
  Array.from(selectedFiles).forEach((file) => {
    formData.append("files", file); // Adjust the key 'files' based on your backend API
  });

  // Append additional data to formData
  for (const key in additionalData) {
    formData.append(key, additionalData[key]);
  }

  try {
    const response = await uploadFilesToServer("your-endpoint", formData);
    console.log("Response from server:", response);
    // Use the response data as needed
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
