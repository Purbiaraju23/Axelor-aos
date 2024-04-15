import axios from "axios";
import { HEADERS, TOKEN_KEY, VEHICLE } from "../Utils/Constant";

export const login = async (reqBody) => {
  const response = await axios.post("/axelor-erp/callback", { ...reqBody });
  if (response.status === 200) {
    const csrf = response.headers.get("x-csrf-token");
    localStorage.setItem(TOKEN_KEY, csrf);
  }
};

export const rest = axios.create({
  baseURL: "/axelor-erp/ws",
  headers: HEADERS,
});

rest.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      await login({
        username: "admin",
        password: "admin",
      });
    }
    return {
      ...config,
      headers: {
        ...config?.headers,
        "X-CSRF-Token": localStorage.getItem(TOKEN_KEY),
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchSalesData = async (model, reqBody) => {
  const response = await rest.post(`/rest/${model}/search`, reqBody);
  return response.data;
};

export const fetchVehicleData = async (model, reqBody) => {
  const response = await rest.post(`/rest/${model}/search`, reqBody);
  return response.data;
};

export const fetchCustomerData = async (model, id, reqBody) => {
  const response = await rest.post(`/rest/${model}/${id}/fetch`, reqBody);
  return response.data;
};

export const fetchCurrencyData = async (model, reqBody) => {
  const response = await rest.post(`/rest/${model}/search`, reqBody);
  return response.data;
};

export const fetchCompanyData = async (model, reqBody) => {
  const response = await rest.post(`/rest/${model}/search`, reqBody);
  return response.data;
};

export const fetchCustomerPartnerData = async (model, reqBody) => {
  const res = await rest.post(`/rest/${model}/search`, reqBody);
  return res.data;
};

export const fetchContactData = async (model, reqBody) => {
  const res = await rest.post(`/rest/${model}/search`, reqBody);
  return res.data;
};

export const fetchSelectedCustomerData = async (reqBody) => {
  const res = await rest.post("/action", reqBody);
  return res.data;
};
export const fetchProductData = async (model, reqBody) => {
  const res = await rest.post(`/rest/${model}/search`, reqBody);
  return res.data;
};

export const fetchProductActionData = async (reqBody) => {
  const res = await rest.post(`/action`, reqBody);
  return res.data;
};

export const fetchModelData = async (model, reqBody) => {
  const res = await rest.post(`/rest/${model}`, reqBody);
  return res.data;
};

export const fetchOrderLine = async (model, reqBody) => {
  const res = await rest.post(`/rest/${model}/search`, reqBody);
  return res.data;
}

export const uploadFile = async (model, reqBody, headers) => {
  const res = await rest.post(`/rest/${model}/upload`, reqBody, headers);
  return res.data;
}

export const fetchActionData = async (reqBody) => {
  const res = await rest.post(`/action`, reqBody);
  return res.data;
}

export const removeData = async (model, reqBody) => {
  await rest.post(`/rest/${model}/removeAll`, reqBody);
}

export const downloadImage = async (id, queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/rest/${VEHICLE}/${id}/image/download?${queryString}`;

  try {
    const response = await rest.get(url, {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      }
    });
    return response;
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}

export const fetchVehcileEditData = async (model, id, reqBody) => {
  const response = await rest.post(`/rest/${model}/${id}/fetch`, reqBody);
  return response.data;
};

export const fetchVehicleSearchData = async (model, reqBody) => {
  const response = await rest.post(`/rest/${model}/search`, reqBody);
  return response.data;
}
