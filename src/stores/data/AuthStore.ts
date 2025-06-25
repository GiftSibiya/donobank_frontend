import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';
import { SessionUser } from '@/types/Types';

// Define User type
interface AuthState {
  sessionUser: SessionUser | null;
  accessToken: string | null;
  login: (userData: SessionUser) => void;
  logout: () => void;
}

// Custom storage object to handle localStorage operations
const storage: PersistStorage<AuthState> = {
  getItem: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as StorageValue<AuthState>) : null;
  },
  setItem: (key: string, value: StorageValue<AuthState>) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

// Zustand store with persistence (stores user data in localStorage)
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      sessionUser: null,
      accessToken: null,
      login: (userData: SessionUser) => {
        set({ sessionUser: userData });
        set({ accessToken: userData.accessToken });
      },
      logout: () => {
        set({ sessionUser: null });
        set({ accessToken: null });
      },
    }),
    {
      name: 'auth',
      storage,
    }
  )
);

export default useAuthStore;
