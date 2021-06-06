import { environment } from "../../environments/environment.prod";

export const ENDPOINTS = {
  
    DASHBOARD: {
        LIST: "api/fundos/list",
        COUNT: "api/fundos/list/count",
        ADD: "api/fundos/add"
    },

    COTAS: {
        LIST: "api/calculo/list",
        COUNT: "api/calculo/list/count",
    },
  
  
};

export const API_ENDPOINT = {
    URL_API: `${environment.apiUrl}/fundos/`,
};
