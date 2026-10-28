 
import "./App.css";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import { useTheme } from "./Context/ThemeContext.jsx";

function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const features = [
    {
      icon: "⚡",
      title: "Fast & Secure",
      description:
        "Enjoy a smooth experience with secure authentication and a simple user interface.",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: "🛡️",
      title: "Protected Access",
      description:
        "Keep your account protected with Clerk-powered sign-in and sign-up.",
      color: "bg-violet-100 text-violet-600",
    },
    {
      icon: "📊",
      title: "Smart Dashboard",
      description:
        "Access your personal dashboard and manage your account in one place.",
      color: "bg-[#2F0F6D]/10 text-[#2F0F6D]",
    },
  ];

  const pageBg = isDark
    ? "bg-slate-950 text-slate-100"
    : "bg-white text-slate-900";

  const navBg = isDark
    ? "border-slate-800 bg-slate-950/90"
    : "border-slate-200/70 bg-white/90";

  const mutedText = isDark
    ? "text-slate-400"
    : "text-slate-600";

  const softBg = isDark
    ? "border-slate-800 bg-slate-900"
    : "border-slate-100 bg-slate-50";

  const navLink = isDark
    ? "text-slate-300 hover:text-[#42169A]"
    : "text-slate-600 hover:text-[#2F0F6D]";

  const primaryButton =
    "bg-[#2F0F6D] text-white hover:bg-[#42169A] transition-colors duration-300";

  return (
    <div
      className={`min-h-screen overflow-hidden transition-colors duration-300 ${pageBg}`}
    >
      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${navBg}`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:px-10">
          {/* Brand */}
          <a href="#home" className="flex shrink-0 items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg ${primaryButton}`}
            >
              A
            </div>

            <div>
             <h1
  className={`text-xl font-extrabold tracking-tight ${
    isDark ? "text-white" : "text-slate-900"
  }`}
>
  Auth
  <span className={isDark ? "text-white" : "text-[#2F0F6D]"}>
    Flow
  </span>
</h1>

              <p
                className={`text-xs ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Secure. Simple. Smart.
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className={`text-sm font-medium transition ${navLink}`}
            >
              Home
            </a>

            <a
              href="#features"
              className={`text-sm font-medium transition ${navLink}`}
            >
              Features
            </a>

            <a
              href="#about"
              className={`text-sm font-medium transition ${navLink}`}
            >
              About
            </a>
          </div>

          {/* Navbar Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark / Light Mode */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-xl transition hover:scale-105 ${
                isDark
                  ? "border-slate-700 bg-slate-800 hover:bg-slate-700"
                  : "border-slate-200 bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* Signed Out */}
            <Show when="signed-out">
              <SignInButton
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
              >
                <button
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition sm:px-4 ${
                    isDark
                      ? "text-slate-200 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-[#2F0F6D]/10 hover:text-[#2F0F6D]"
                  }`}
                >
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
              >
                <button
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold shadow-lg sm:px-5 ${primaryButton}`}
                >
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            {/* Signed In */}
            <Show when="signed-in">
              <a
                href="/dashboard"
                className={`hidden rounded-xl px-4 py-2.5 text-sm font-semibold sm:inline-block ${primaryButton}`}
              >
                Dashboard
              </a>

              <UserButton />
            </Show>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative isolate">
          <div className="pointer-events-none absolute -right-32 -top-24 -z-10 h-96 w-96 rounded-full bg-[#42169A]/10 blur-3xl" />

          <div className="pointer-events-none absolute -left-32 top-40 -z-10 h-80 w-80 rounded-full bg-[#2F0F6D]/10 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:px-10 lg:py-32">
            <div>
              {/* Hero Badge */}
              <div
                className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                  isDark
                    ? "border-[#42169A] bg-[#2F0F6D]/30 text-purple-200"
                    : "border-[#2F0F6D]/10 bg-[#2F0F6D]/5 text-[#2F0F6D]"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Your secure digital experience starts here
              </div>

              <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                One account.

                <span className="mt-2 block bg-gradient-to-r from-[#2F0F6D] to-[#42169A] bg-clip-text text-transparent">
                  Endless possibilities.
                </span>
              </h2>

              <p
                className={`mt-7 max-w-xl text-base leading-8 sm:text-lg ${mutedText}`}
              >
                Welcome to AuthFlow — a modern authentication platform
                designed to make your digital experience simple, secure,
                and seamless. Sign in to continue or create your account
                in just a few steps.
              </p>

              {/* Hero Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Show when="signed-out">
                  <SignUpButton
                    forceRedirectUrl="/dashboard"
                    fallbackRedirectUrl="/dashboard"
                  >
                    <button
                      className={`group flex items-center gap-3 rounded-2xl px-6 py-4 font-bold shadow-xl transition duration-300 hover:-translate-y-1 ${primaryButton}`}
                    >
                      Get Started
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </SignUpButton>

                  <SignInButton
                    forceRedirectUrl="/dashboard"
                    fallbackRedirectUrl="/dashboard"
                  >
                    <button
                      className={`rounded-2xl border px-6 py-4 font-bold shadow-sm transition ${
                        isDark
                          ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-[#42169A] hover:bg-slate-800"
                          : "border-slate-200 bg-white text-slate-700 hover:border-[#42169A] hover:bg-[#2F0F6D]/5 hover:text-[#2F0F6D]"
                      }`}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </Show>

                <Show when="signed-in">
                  <a
                    href="/dashboard"
                    className={`group flex items-center gap-3 rounded-2xl px-6 py-4 font-bold shadow-xl transition duration-300 hover:-translate-y-1 ${primaryButton}`}
                  >
                    Open Dashboard
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </Show>
              </div>

              {/* Benefits */}
              <div
                className={`mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-bold text-green-500">✓</span>
                  Secure authentication
                </span>

                <span className="flex items-center gap-2">
                  <span className="font-bold text-green-500">✓</span>
                  Easy to use
                </span>
              </div>
            </div>

            {/* WORKSPACE PREVIEW */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[#2F0F6D]/20 to-[#42169A]/20 blur-2xl" />

              <div
                className={`relative rounded-[2rem] border p-5 shadow-2xl sm:p-8 ${
                  isDark
                    ? "border-slate-700 bg-slate-900 shadow-black/30"
                    : "border-white bg-white shadow-slate-300/60"
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-5 ${
                    isDark ? "border-slate-700" : "border-slate-100"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      YOUR WORKSPACE
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold">
                      Welcome back!
                    </h3>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
                      isDark
                        ? "bg-[#2F0F6D]/40"
                        : "bg-[#2F0F6D]/5"
                    }`}
                  >
                    👋
                  </div>
                </div>

                {/* Purple Account Card */}
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#2F0F6D] to-[#42169A] p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">
                        Account status
                      </p>

                      <h4 className="mt-2 text-2xl font-bold">
                        You're all set!
                      </h4>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl text-white">
                      ✓
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/90">
                    A simple place to begin your digital journey.
                  </p>
                </div>

                {/* Preview Features */}
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className={`rounded-2xl border p-4 ${softBg}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-xl">
                      🔒
                    </div>

                    <p className="mt-4 font-bold">Secure</p>

                    <p
                      className={`mt-1 text-sm ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Account access
                    </p>
                  </div>

                  <div className={`rounded-2xl border p-4 ${softBg}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-xl">
                      ✨
                    </div>

                    <p className="mt-4 font-bold">Simple</p>

                    <p
                      className={`mt-1 text-sm ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Smooth experience
                    </p>
                  </div>
                </div>

                {/* Account Information */}
                <div
                  className={`mt-5 flex items-center gap-3 rounded-2xl border p-4 ${
                    isDark ? "border-slate-700" : "border-slate-100"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2F0F6D]/10 font-bold text-[#2F0F6D]">
                    AF
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">Your account</p>

                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Your journey starts here
                    </p>
                  </div>

                  <span className="text-xl text-green-500">✓</span>
                </div>
              </div>

              {/* Protected Badge */}
              <div
                className={`absolute -right-3 top-16 hidden rounded-2xl border p-4 shadow-xl sm:block sm:-right-6 ${
                  isDark
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-xl">
                    🛡️
                  </div>

                  <div>
                    <p className="text-sm font-bold">Protected</p>

                    <p
                      className={`text-xs ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Sign-in experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section
          id="features"
          className={`py-20 transition-colors duration-300 sm:py-24 ${
            isDark ? "bg-slate-900/70" : "bg-slate-50"
          }`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2F0F6D]">
                Why AuthFlow?
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Everything you need to get started
              </h2>

              <p className={`mt-5 leading-7 ${mutedText}`}>
                A clean interface, reliable authentication, and a
                dashboard designed with simplicity in mind.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className={`group rounded-3xl border p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#42169A]/50 hover:shadow-xl ${
                    isDark
                      ? "border-slate-800 bg-slate-950 hover:shadow-black/20"
                      : "border-slate-200/80 bg-white hover:shadow-[#2F0F6D]/10"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${feature.color}`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className={`mt-3 leading-7 ${mutedText}`}>
                    {feature.description}
                  </p>

                  <a
                    href="#about"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-[#2F0F6D] transition hover:text-[#42169A]"
                  >
                    Learn more <span>→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / CALL TO ACTION */}
        <section id="about" className="px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2F0F6D] to-[#42169A] px-7 py-14 text-center text-white sm:px-12 sm:py-16">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                Start today
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                Ready to experience a simpler way to sign in?
              </h2>

              <p className="mt-5 leading-7 text-white/80">
                Create your account and explore your personal
                dashboard with AuthFlow.
              </p>

              <div className="mt-8">
                <Show when="signed-out">
                  <SignUpButton
                    forceRedirectUrl="/dashboard"
                    fallbackRedirectUrl="/dashboard"
                  >
                    <button className="rounded-2xl bg-white px-7 py-4 font-bold text-[#2F0F6D] transition hover:bg-purple-100">
                      Create Your Account →
                    </button>
                  </SignUpButton>
                </Show>

                <Show when="signed-in">
                  <a
                    href="/dashboard"
                    className="inline-block rounded-2xl bg-white px-7 py-4 font-bold text-[#2F0F6D] transition hover:bg-purple-100"
                  >
                    Go to Dashboard →
                  </a>
                </Show>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t ${
          isDark
            ? "border-slate-800 bg-slate-950"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8 lg:px-10">
           <a href="#home" className="text-lg font-extrabold">
  <span className={isDark ? "text-white" : "text-slate-900"}>
    Auth
  </span>
  <span className={isDark ? "text-white" : "text-[#2F0F6D]"}>
    Flow
  </span>
</a>

          <p
            className={`text-center text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            © {new Date().getFullYear()} AuthFlow. Built with React,
            Tailwind CSS & Clerk.
          </p>

          <a
            href="#home"
            className={`text-sm font-semibold transition ${navLink}`}
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
