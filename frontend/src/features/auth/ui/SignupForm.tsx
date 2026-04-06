import { type FormEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegisterMutation } from '../api/useRegisterMutation'
import { registerSchema, type RegisterFormValues } from '../model/authSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, ArrowRight, Rocket, AlertCircle, Check, X } from 'lucide-react'

function getPasswordStrength(pw: string): { level: number; label: string } {
  if (!pw) return { level: 0, label: '' }
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 1) return { level: 1, label: 'Weak' }
  if (score <= 3) return { level: 2, label: 'Medium' }
  return { level: 3, label: 'Strong' }
}

export function SignupForm() {
  const registerMutation = useRegisterMutation()
  const [payload, setPayload] = useState<RegisterFormValues>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const submitting = registerMutation.isPending
  const serverError = registerMutation.error ? 'Registration failed. Please try again.' : ''

  const strength = useMemo(() => getPasswordStrength(payload.password), [payload.password])

  const strengthBarColor = (idx: number) => {
    if (idx >= strength.level) return 'bg-[#4a4455]/30'
    if (strength.level === 1) return 'bg-red-500'
    if (strength.level === 2) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  const strengthTextColor = () => {
    if (strength.level === 1) return 'text-red-400'
    if (strength.level === 2) return 'text-amber-400'
    return 'text-emerald-400'
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = registerSchema.safeParse(payload)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      })
      return
    }
    setErrors({})
    if (!agreed) return

    const { confirmPassword: _, ...registerPayload } = result.data
    registerMutation.mutate(registerPayload)
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Hero Panel */}
      <div className="relative hidden w-[45%] overflow-hidden lg:flex lg:flex-col lg:justify-between bg-gradient-to-br from-indigo-800 via-violet-700 to-purple-900">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl animate-[auth-orb-float_14s_ease-in-out_infinite_alternate]" />
          <div className="absolute bottom-32 left-8 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl animate-[auth-orb-float_10s_ease-in-out_infinite_alternate-reverse]" />
          <div className="absolute top-1/3 right-1/4 h-36 w-36 rounded-full bg-cyan-400/10 blur-2xl animate-[auth-orb-float_8s_ease-in-out_infinite_alternate]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(135deg, white 1px, transparent 1px), linear-gradient(225deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center flex-1 px-12 py-16">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <Rocket className="h-6 w-6 text-purple-200" />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Organize.<br />
            Collaborate.<br />
            Achieve.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-indigo-200/80">
            Join thousands of teams already building the future of productivity with SmartTask.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl font-bold text-white">10K+</p>
              <p className="mt-1 text-xs text-purple-200/60">Active Teams</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="mt-1 text-xs text-purple-200/60">Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.9★</p>
              <p className="mt-1 text-xs text-purple-200/60">User Rating</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-12 py-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-indigo-300/40">
            © 2024 SmartTask Inc. The Luminescent Monolith.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#060e20] px-6 py-8 sm:px-12 lg:px-20 overflow-y-auto">
        <div className="w-full max-w-[440px]">
          {/* Brand */}
          <Link to="/" className="mb-6 inline-block text-lg font-bold tracking-tight text-violet-400">
            SmartTask
          </Link>

          {/* Header */}
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[#a3aac4]">
            Start your journey with the ethereal productivity engine.
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {serverError && (
              <div className="flex items-center gap-3 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {serverError}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="signup-name" className="text-xs font-medium uppercase tracking-wider text-[#a3aac4]">
                Full Name
              </Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                value={payload.fullName}
                onChange={(e) => setPayload((p) => ({ ...p, fullName: e.target.value }))}
                autoComplete="name"
                className="h-11 border-[#40485d]/25 bg-[#0f1930] text-[#dee5ff] placeholder:text-[#40485d] focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
              />
              {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-xs font-medium uppercase tracking-wider text-[#a3aac4]">
                Email Address
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="name@company.com"
                value={payload.email}
                onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
                autoComplete="email"
                className="h-11 border-[#40485d]/25 bg-[#0f1930] text-[#dee5ff] placeholder:text-[#40485d] focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-xs font-medium uppercase tracking-wider text-[#a3aac4]">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={payload.password}
                  onChange={(e) => setPayload((p) => ({ ...p, password: e.target.value }))}
                  autoComplete="new-password"
                  className="h-11 pr-10 border-[#40485d]/25 bg-[#0f1930] text-[#dee5ff] placeholder:text-[#40485d] focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d758c] hover:text-[#a3aac4] transition-colors"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}

              {/* Strength Meter */}
              {payload.password && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex flex-1 gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${strengthBarColor(i)}`} />
                    ))}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${strengthTextColor()}`}>
                    {strength.label}
                  </span>
                </div>
              )}

              {/* Password Rules */}
              {payload.password && (
                <div className="space-y-1 pt-1">
                  {[
                    { met: payload.password.length >= 6, label: 'At least 6 characters' },
                    { met: /[A-Z]/.test(payload.password), label: 'One uppercase letter' },
                    { met: /[0-9]/.test(payload.password), label: 'One number' },
                  ].map(({ met, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs">
                      {met ? <Check className="h-3 w-3 text-emerald-400" /> : <X className="h-3 w-3 text-[#6d758c]" />}
                      <span className={met ? 'text-emerald-400' : 'text-[#6d758c]'}>{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="signup-confirm-pw" className="text-xs font-medium uppercase tracking-wider text-[#a3aac4]">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="signup-confirm-pw"
                  type={showConfirmPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={payload.confirmPassword}
                  onChange={(e) => setPayload((p) => ({ ...p, confirmPassword: e.target.value }))}
                  autoComplete="new-password"
                  className="h-11 pr-10 border-[#40485d]/25 bg-[#0f1930] text-[#dee5ff] placeholder:text-[#40485d] focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d758c] hover:text-[#a3aac4] transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(c) => setAgreed(c === true)}
                className="mt-0.5 border-[#40485d] data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
              />
              <label htmlFor="terms" className="text-xs leading-relaxed text-[#a3aac4] cursor-pointer">
                I agree to the{' '}
                <a href="#" onClick={(e) => e.preventDefault()} className="text-violet-400 hover:text-violet-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" onClick={(e) => e.preventDefault()} className="text-violet-400 hover:text-violet-300">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting || !agreed}
              className="h-11 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <Separator className="flex-1 bg-[#40485d]/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#40485d]">
                Or continue with
              </span>
              <Separator className="flex-1 bg-[#40485d]/20" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 border-[#40485d]/25 bg-transparent text-[#a3aac4] hover:bg-[#192540] hover:text-white cursor-pointer"
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
                className="h-11 border-[#40485d]/25 bg-transparent text-[#a3aac4] hover:bg-[#192540] hover:text-white cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-[#6d758c]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
