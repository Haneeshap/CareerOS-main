import { useAuth as useAuthContext } from '@/components/auth-provider';

/**
 * useAuth Hook
 * 
 * Wrapper around AuthContext to provide a cleaner interface
 * and potentially add helper methods for auth state checks
 */
export function useAuth() {
  const auth = useAuthContext();

  return {
    ...auth,
    isAuthenticated: !!auth.user,
    // Helper to check if user has a specific role (if implemented in the future)
    // hasRole: (role: string) => auth.user?.app_metadata?.role === role,
  };
}