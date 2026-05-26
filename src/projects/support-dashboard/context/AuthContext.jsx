import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MOCK_ACCOUNTS } from "../data/mockAccounts.js";

const STORAGE_KEY = "nw_auth_user";
const STORAGE_REMEMBER = "nw_auth_remember";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return MOCK_ACCOUNTS.find((a) => a.id === parsed.id) ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setReady(true);
  }, []);

  const persistUser = useCallback((account, remember) => {
    const payload = JSON.stringify({ id: account.id });
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, payload);
      localStorage.setItem(STORAGE_REMEMBER, "1");
    } else {
      sessionStorage.setItem(STORAGE_KEY, payload);
      localStorage.removeItem(STORAGE_REMEMBER);
    }
    setUser(account);
  }, []);

  const login = useCallback(
    (email, password, remember) => {
      const match =
        MOCK_ACCOUNTS.find((a) => a.email.toLowerCase() === String(email).trim().toLowerCase()) ??
        MOCK_ACCOUNTS[0];
      if (!password || String(password).length < 1) return { ok: false, error: "Enter a password." };
      persistUser(match, remember);
      return { ok: true };
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_REMEMBER);
    setUser(null);
  }, []);

  const switchUser = useCallback(
    (accountId) => {
      const next = MOCK_ACCOUNTS.find((a) => a.id === accountId);
      if (!next) return;
      const remember = localStorage.getItem(STORAGE_REMEMBER) === "1";
      persistUser(next, remember);
    },
    [persistUser]
  );

  const value = useMemo(
    () => ({
      user,
      ready,
      login,
      logout,
      switchUser,
      accounts: MOCK_ACCOUNTS,
    }),
    [user, ready, login, logout, switchUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
