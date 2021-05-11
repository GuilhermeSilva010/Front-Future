import { environment } from "../../environments/environment.prod";

export const ENDPOINTS = {
  
    DASHBOARD: {
        LIST: "api/fundos/list",
        COUNT: "api/fundos/list/count",
    },
  
  
  
};

export const API_ENDPOINT = {
    URL_API: `${environment.apiUrl}/fundos/`,
};
