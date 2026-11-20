import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import * as Sentry from '@sentry/react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types/auth';
import { fetchMyProfile } from '../services/usersService';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isSuperAdmin: boolean;
  isLoading: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadProfileForSession = useCallback(async (activeSession: Session | null) => {
    if (!activeSession?.user) {
      setProfile(null);
      Sentry.setUser(null);
      return;
    }

    try {
      const loadedProfile = await fetchMyProfile(activeSession.user.id);
      if (!loadedProfile) {
        await supabase?.auth.signOut();
        setSession(null);
        setProfile(null);
        Sentry.setUser(null);
        setAuthError('Account profile not found. Please contact a superadmin.');
        return;
      }

      if (!loadedProfile.isActive) {
        await supabase?.auth.signOut();
        setSession(null);
        setProfile(null);
        Sentry.setUser(null);
        setAuthError('Your account has been deactivated. Please contact a superadmin.');
        return;
      }

      setProfile(loadedProfile);
      setAuthError(null);
      Sentry.setUser({
        id: loadedProfile.id,
        email: loadedProfile.email,
        username: loadedProfile.fullName,
      });
    } catch (err) {
      Sentry.captureException(err);
      setProfile(null);
      setAuthError(err instanceof Error ? err.message : 'Unable to load account profile.');
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    const client = supabase;
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await client.auth.getSession();

        if (!isMounted) return;
        setSession(initialSession);
        await loadProfileForSession(initialSession);
      } catch (err) {
        Sentry.captureException(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void initializeAuth();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      // Avoid calling Supabase queries synchronously inside the auth callback lock
      void Promise.resolve().then(() => loadProfileForSession(nextSession));
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfileForSession]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        throw new Error('Authentication service is not configured.');
      }
      setAuthError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSession(data.session);
      await loadProfileForSession(data.session);
    },
    [loadProfileForSession]
  );

  const signOut = useCallback(async () => {
    setAuthError(null);
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setProfile(null);
    Sentry.setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfileForSession(session);
  }, [loadProfileForSession, session]);

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    profile,
    isSuperAdmin: profile?.role === 'superadmin' && profile.isActive,
    isLoading,
    authError,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
