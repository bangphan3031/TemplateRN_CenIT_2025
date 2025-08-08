import axios from 'axios';
import { API_BASE_URL, API_PRIVATE_KEY } from '../constants/api';
import { store } from '../store/store';

// File chứa các hàm gọi api không yêu cầu check quyền

// API GET
// const getData = async (url = '', params = {}) => {
//   try {
//     // lấy thông tin user đã đăng nhập từ store
//     const user = store.getState().userReducer.user;

//     // gọi api
//     const response = await axios.get(`${API_BASE_URL}/${url}`, {
//       params: params,
//     });

//     // trả về kết quả
//     return response.data;
//   } catch (error) {
//     console.error('GET Request Error:', error);
//     throw error;
//   }
// };
const getData = async (
  url = '',
  params = {},
  retryCount = 0,
  maxRetries = 2,
) => {
  try {
    // lấy thông tin user đã đăng nhập từ store
    const user = store.getState().userReducer.user;

    // gọi api
    const response = await axios.get(`${API_BASE_URL}/${url}`, {
      params: params,
    });

    // trả về kết quả
    return response.data;
  } catch (error) {
    console.error(`GET Request Error (lần thử ${retryCount + 1}):`, error);

    // Nếu lỗi là 500 và chưa vượt quá số lần thử lại tối đa
    if (
      error.response &&
      error.response.status === 500 &&
      retryCount < maxRetries
    ) {
      console.log(
        `Đang thử lại request tới ${url} - lần thứ ${retryCount + 2}...`,
      );

      // Chờ một khoảng thời gian trước khi thử lại (độ trễ tăng dần)
      const delay = 1000 * Math.pow(2, retryCount); // 1s, 2s, 4s,...
      await new Promise(resolve => setTimeout(resolve, delay));

      // Thử lại
      return getData(url, params, retryCount + 1, maxRetries);
    }

    // Nếu không thể thử lại hoặc đã vượt quá số lần thử, ném lỗi
    throw error;
  }
};

// API POST
const postData = async (url = '', data = {}) => {
  console.log(data);

  try {
    // gọi api
    const response = await axios.post(`${API_BASE_URL}/${url}`, data, {});

    // trả về kết quả
    return response.data;
  } catch (error) {
    console.error('POST Request Error:', error);
    throw error;
  }
};

// API UPLOAD FILES WITH FORM
const uploadMultipleFiles = async (url = '', form, files = []) => {
  try {
    // lấy thông tin user đã đăng nhập từ store
    const user = store.getState().userReducer.user;

    // truyền form và files vào FormData
    const formData = new FormData();

    if (form) {
      for (const key in form) {
        formData.append(key, form[key]);
      }
    }

    if (files && files.length) {
      files.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });
    }

    // gọi api
    const response = await axios.post(`${API_BASE_URL}/${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // trả về kết quả
    return response.data;
  } catch (error) {
    console.error('Upload Request Error:', error);
    throw error;
  }
};

export { getData, postData, uploadMultipleFiles };
