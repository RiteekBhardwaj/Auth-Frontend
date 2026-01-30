const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiError = {
  message?: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }
  return res.json();
}

export async function sendOtp(email: string, entity: string) {
  const res = await fetch(`${BASE_URL}/api/auth/${entity}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse<{ message: string }>(res);
}

export async function create(data: {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}) {
  const res = await fetch(`${BASE_URL}/api/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return handleResponse<{ message: string }>(res);
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return handleResponse<{ message: string }>(res);
}

export async function logout() {
  const res = await fetchWithAuth(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return handleResponse<{ message: string }>(res);
}

export async function forgotPass(data: {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}) {
  const res = await fetch(`${BASE_URL}/api/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<{ message: string }>(res);
}

export async function profile() {
  const res = await fetchWithAuth(`${BASE_URL}/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse<{ username: string; roles: string[] }>(res);
}

async function fetchWithAuth(url: string, options?: RequestInit) {
  let res = await fetch(url, { ...options, credentials: "include" });

  if (res.status === 401) {
    const refresh = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refresh.ok) {
      window.location.href = "/";
      return res;
    }

    res = await fetch(url, { ...options, credentials: "include" });
  }

  return res;
}
