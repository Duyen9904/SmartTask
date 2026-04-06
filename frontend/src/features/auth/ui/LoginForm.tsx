import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../api/useLoginMutation'
import { loginSchema, type LoginFormValues } from '../model/authSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, ArrowRight, Sparkles, AlertCircle } from 'lucide-react'

export function LoginForm() {
  const loginMutation = useLoginMutation()
  const [payload, setPayload] = useState<LoginFormValues>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({})
  const [showPw, setShowPw] = useState(false)

  const submitting = loginMutation.isPending
  const serverError = loginMutation.error ? 'Login failed. Please check your credentials.' : ''

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = loginSchema.safeParse(payload)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })
      return
    }
    setErrors({})
    loginMutation.mutate(result.data)
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Hero Panel */}
      <div className="relative hidden w-[45%] overflow-hidden lg:flex lg:flex-col lg:justify-between bg-gradient-to-br from-violet-700 via-indigo-800 to-slate-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-[auth-orb-float_12s_ease-in-out_infinite_alternate]" />
          <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-indigo-400/15 blur-3xl animate-[auth-orb-float_10s_ease-in-out_infinite_alternate-reverse]" />
          <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-blue-400/10 blur-2xl animate-[auth-orb-float_8s_ease-in-out_infinite_alternate]" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(135deg, white 1px, transparent 1px), linear-gradient(225deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center flex-1 px-12 py-16">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-purple-200" />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            The Ethereal<br />
            Productivity<br />
            Engine.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-purple-200/80">
            Redefining the architecture of workflow through tonal depth and luminescent clarity.
          </p>

          {/* Floating code card */}
          <div className="mt-12 max-w-xs rounded-lg bg-white/[0.07] p-4 backdrop-blur-md">
            <div className="mb-3 flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 rounded bg-white/20" />
              <div className="h-2 w-1/2 rounded bg-white/15" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-12 py-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-purple-300/40">
            © 2024 SmartTask Inc. Built for the Luminescent Architect.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#0b1326] px-6 py-12 sm:px-12 lg:px-20">
        <div className="w-full max-w-[420px]">
          {/* Brand */}
          <Link to="/" className="mb-8 inline-block text-lg font-bold tracking-tight text-violet-400">
            SmartTask
          </Link>

          {/* Header */}
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-[#958da1]">
            Enter your credentials to access your workspace.
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            {/* Server Error */}
            {serverError && (
              <div className="flex items-center gap-3 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {serverError}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-xs font-medium uppercase tracking-wider text-[#958da1]">
                Email Address
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="name@company.com"
                value={payload.email}
                onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
                autoComplete="email"
                className="h-11 border-[#4a4455]/25 bg-[#060e20] text-[#dae2fd] placeholder:text-[#4a4455] focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-xs font-medium uppercase tracking-wider text-[#958da1]">
                  Password
                </Label>
                <Link to="/forgot-password" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={payload.password}
                  onChange={(e) => setPayload((p) => ({ ...p, password: e.target.value }))}
                  autoComplete="current-password"
                  className="h-11 pr-10 border-[#4a4455]/25 bg-[#060e20] text-[#dae2fd] placeholder:text-[#4a4455] focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#958da1] hover:text-[#ccc3d8] transition-colors"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <Checkbox id="remember" className="border-[#4a4455] data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600" />
              <label htmlFor="remember" className="text-sm text-[#958da1] cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer"
            >
              {submitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <Separator className="flex-1 bg-[#4a4455]/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4a4455]">
                Or continue with
              </span>
              <Separator className="flex-1 bg-[#4a4455]/20" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 border-[#4a4455]/25 bg-transparent text-[#ccc3d8] hover:bg-[#222a3d] hover:text-white cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 border-[#4a4455]/25 bg-transparent text-[#ccc3d8] hover:bg-[#222a3d] hover:text-white cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#958da1]">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
