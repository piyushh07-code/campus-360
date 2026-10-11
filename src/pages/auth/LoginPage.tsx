import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('e.rostova@stanford.edu');
  const [password, setPassword] = useState('StanfordWater@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [simulatedState, setSimulatedState] = useState<'default' | 'validation' | 'auth-failed' | 'loading'>('default');

  const handleStatePillClick = (state: 'default' | 'validation' | 'auth-failed' | 'loading') => {
    setSimulatedState(state);
    if (state === 'default') {
      setEmail('e.rostova@stanford.edu');
      setPassword('StanfordWater@2025');
      setErrorMsg(null);
      setIsLoading(false);
    } else if (state === 'validation') {
      setEmail('invalid-email-address');
      setPassword('123');
      setErrorMsg('Please enter a valid academic institutional email and password (min 8 chars).');
      setIsLoading(false);
    } else if (state === 'auth-failed') {
      setEmail('sunetid@stanford.edu');
      setPassword('WrongPassword#99');
      setErrorMsg('Invalid Stanford Duo SSO session token. Please re-authenticate your campus credentials.');
      setIsLoading(false);
    } else if (state === 'loading') {
      setIsLoading(true);
      setErrorMsg(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid campus email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      login(email, 'student');
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check credentials or try Demo Mode.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Simulate Stanford Pass SSO
      await loginAsDemo('student');
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg('SSO authorization timed out. Please enter via demo portal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between">
      {/* Top Bar Header */}
      <header className="w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" showText={true} />
          </div>
          <Link
            to="/demo-portal"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[15px]">science</span>
            <span>Demo Portal</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-md w-full mx-auto">
        {/* Interactive State Simulation Bar (Design fidelity feature) */}
        <div className="w-full bg-surface-container px-3 py-2.5 rounded-xl mb-4 flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-primary">tune</span>
              UI State Simulation
            </span>
            <span className="text-secondary font-medium">Design States</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
            <button
              type="button"
              onClick={() => handleStatePillClick('default')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                simulatedState === 'default'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => handleStatePillClick('validation')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                simulatedState === 'validation'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              Validation Error
            </button>
            <button
              type="button"
              onClick={() => handleStatePillClick('auth-failed')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                simulatedState === 'auth-failed'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              Auth Failed
            </button>
            <button
              type="button"
              onClick={() => handleStatePillClick('loading')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                simulatedState === 'loading'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              Signing In
            </button>
          </div>
        </div>

        {/* Dynamic Alert Banner */}
        {errorMsg && (
          <div className="w-full mb-4 p-3.5 rounded-xl bg-error/10 border border-error/20 text-on-surface flex items-start gap-2.5 shadow-sm transition-all duration-300">
            <span className="material-symbols-outlined text-[20px] text-error shrink-0 mt-0.5">error</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold leading-tight text-error">Authentication Notice</p>
              <p className="text-xs mt-0.5 text-on-surface-variant">{errorMsg}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMsg(null)}
              className="w-6 h-6 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-black/5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* Brand Lockup & Hero Heading */}
        <div className="flex flex-col items-center text-center px-1 mb-6 w-full">
          <div className="flex items-center gap-1.5 justify-center mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide">
              SmartStudy AI
            </span>
            <span className="text-outline-variant text-[10px]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[11px] font-semibold tracking-wide">
              WaterWatch
            </span>
          </div>
          <p className="text-xs text-on-surface-variant italic mb-2 tracking-wide font-newsreader text-base">
            "Study smarter. Waste less. Campus better."
          </p>
          <h1 className="font-newsreader text-3xl font-medium text-on-surface mb-1">
            Welcome Back
          </h1>
          <p className="text-xs text-on-surface-variant max-w-[340px] leading-relaxed">
            Sign in with institutional credentials or university SSO to access your academic sprints and campus sustainability portal.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          {/* Institutional SSO Button */}
          <button
            type="button"
            onClick={handleSSOLogin}
            disabled={isLoading}
            className="w-full min-h-[48px] rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface active:scale-[0.99] transition-all flex items-center justify-between px-4 shadow-sm border border-outline-variant/40"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[22px] text-primary">verified_user</span>
              <span className="text-sm font-semibold tracking-tight">Sign in with Stanford Pass</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">arrow_forward</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-full h-[1px] bg-surface-container"></div>
            <span className="absolute px-3 bg-surface-container-lowest text-[11px] text-on-surface-variant font-medium">
              or continue with campus email
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            {/* Campus Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface flex items-center justify-between" htmlFor="email-input">
                <span>Campus Email</span>
                <span className="text-[11px] text-tertiary flex items-center gap-0.5 font-medium">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  Stanford IDP
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 pointer-events-none">
                  mail
                </span>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sunetid@stanford.edu"
                  className="w-full h-11 pl-9 pr-9 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-primary focus:bg-white focus:outline-none transition-all"
                  required
                />
                {email.includes('@') && (
                  <div className="absolute right-3 flex items-center pointer-events-none text-tertiary">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-on-surface-variant pl-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-primary">info</span>
                Must be an active @stanford.edu or university email
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface" htmlFor="pwd-input">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 pointer-events-none">
                  lock
                </span>
                <input
                  id="pwd-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-11 pl-9 pr-11 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-primary focus:bg-white focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-10 h-10 absolute right-0.5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember & Forgot Controls */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                />
                <span className="text-on-surface-variant">Remember for 30d</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to your institutional email.')}
                className="font-medium text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[46px] rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm mt-1"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Campus Workspace</span>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Experience Entry CTA */}
          <div className="pt-2 text-center border-t border-outline-variant/20">
            <Link
              to="/demo-portal"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-primary hover:bg-surface-variant transition-colors text-xs font-medium"
            >
              <span>Exploring as an Evaluator?</span>
              <span className="font-semibold underline">Try Demo Experience Mode →</span>
            </Link>
          </div>
        </div>

        {/* Isolation & Trust Micro-Card */}
        <div className="w-full mt-4 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
          </div>
          <div className="flex-1 text-[11px] leading-relaxed text-on-surface-variant">
            <strong className="text-on-surface block font-semibold">Strict Role Isolation Guarantee</strong>
            Student syllabus and Pomodoro metrics are cryptographically isolated from Facilities dispatch records.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-[11px] text-on-surface-variant border-t border-outline-variant/20">
        <p>© 2026 SmartCampus 360 • Stanford University Student Life & Facilities Engineering</p>
      </footer>
    </div>
  );
};
