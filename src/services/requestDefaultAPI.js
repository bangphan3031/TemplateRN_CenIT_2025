import axios from 'axios';
import {API_BASE_URL, API_PRIVATE_KEY} from '../constants/api';
import {store} from '../store/store';

// File chứa các hàm gọi api không yêu cầu check quyền

// API GET
const getData = async (url = '', params = {}) => {
  console.log(params)
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
    console.error('GET Request Error:', error);
    throw error;
  }
};

// API POST
const postData = async (url = '', data = {}) => {
  try {
    // gọi api
    const response = await axios.post(`${API_BASE_URL}/${url}`, data, {});

    console.log(url, data)

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

export {getData, postData, uploadMultipleFiles};
