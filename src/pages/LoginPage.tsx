import React, { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, AlertTriangle, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const LoginPage: React.FC = () => {
  const { signIn, authError } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const displayedError = formError || authError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password) {
      setFormError('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/70 flex flex-col justify-between text-foreground antialiased">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm mb-3">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Acme Insurance</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Claims Review Workbench &amp; Admin Console
            </p>
          </div>

          {/* Login Card */}
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg">Sign in</CardTitle>
              <CardDescription>
                Enter your work email and password to access your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isSupabaseConfigured && (
                <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Supabase environment variables are not configured. Set{' '}
                    <code className="font-mono font-semibold">VITE_SUPABASE_URL</code> and{' '}
                    <code className="font-mono font-semibold">VITE_SUPABASE_ANON_KEY</code>.
                  </span>
                </div>
              )}

              {displayedError && (
                <div
                  role="alert"
                  className="rounded-md border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-start gap-2"
                >
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{displayedError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="text-xs font-medium text-foreground">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@acme-insurance.com"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="login-password" className="text-xs font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-9 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isSupabaseConfigured}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-[11px] text-muted-foreground text-center pt-3 border-t border-border">
                Accounts are provisioned by an Acme Insurance Superadmin. Contact your administrator for access.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="py-4 text-center text-[11px] text-muted-foreground border-t border-border bg-background">
        Acme Insurance Claims Review Workbench &middot; Authorized Personnel Only
      </footer>
    </div>
  );
};
