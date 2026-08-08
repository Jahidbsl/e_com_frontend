export const saveToken = (token) => {
  localStorage.setItem("access_token", token.access);
  localStorage.setItem("refresh_token", token.refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
};

export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch (error) {
    clearTokens();
    return null;
  }
};

export const authFetch = async (url, options = {}) => {
  let token = getAccessToken();

  const makeRequest = async (currentAccessToken) => {
    const headers = {
      "Content-Type": "application/json",
      ...(currentAccessToken ? { Authorization: `Bearer ${currentAccessToken}` } : {}),
      ...(options.headers || {}),
    };

    let method = options.method || "GET";
    let body = options.body;

    if (!options.method && !options.body && Object.keys(options).length > 0 && !options.headers) {
      method = "POST";
      body = JSON.stringify(options);
    } else if (body && typeof body === "object") {
      body = JSON.stringify(body);
    }

    return fetch(url, {
      ...options,
      method,
      headers,
      ...(body ? { body } : {}),
    });
  };

  let response = await makeRequest(token);

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await makeRequest(newToken);
    } else {
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
  }

  return response;
};