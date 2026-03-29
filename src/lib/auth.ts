// import jwt from "jsonwebtoken";

// export function verifyToken(authHeader?: string) {
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return null;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     return jwt.verify(token, process.env.JWT_SECRET!);
//   } catch {
//     return null;
//   }
// }
// // src/lib/auth.ts
// export const TOKEN_KEY = "pgf_token";

// export function saveToken(token: string) {
//   localStorage.setItem(TOKEN_KEY, token);
// }

// export function getToken() {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem(TOKEN_KEY);
// }

// export function clearToken() {
//   localStorage.removeItem(TOKEN_KEY);
// }
import jwt from "jsonwebtoken";

export const TOKEN_KEY = "pgf_token";

type JwtPayload = {
  student_id: string;
  email?: string;
  role?: string;
};

export function verifyToken(authHeader?: string) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}

export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}