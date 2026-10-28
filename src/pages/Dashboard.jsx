 
import { useEffect, useMemo, useState } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/react";
import { useTheme } from "../Context/ThemeContext.jsx";

const BRAND = "#2F0F6D";
const BRAND_HOVER = "#42169A";

const initialTasks = [
  {
    id: 1,
    title: "Set up authentication",
    completed: true,
    priority: "High",
    category: "Development",
  },
  {
    id: 2,
    title: "Design the dashboard UI",
    completed: false,
    priority: "High",
    category: "Design",
  },
  {
    id: 3,
    title: "Test sign-in and sign-up",
    completed: false,
    priority: "Medium",
    category: "Development",
  },
  {
    id: 4,
    title: "Check mobile responsiveness",
    completed: false,
    priority: "Low",
    category: "Testing",
  },
];

const projects = [
  {
    title: "AuthFlow Website",
    description: "Authentication & dashboard",
    progress: 85,
    icon: "🔐",
    gradient: "from-[#2F0F6D] to-[#7040B8]",
    tag: "In progress",
  },
  {
    title: "UI Design System",
    description: "Components & visual design",
    progress: 65,
    icon: "🎨",
    gradient: "from-[#4B208B] to-[#8B5CC7]",
    tag: "In progress",
  },
  {
    title: "Responsive Experience",
    description: "Mobile and desktop layouts",
    progress: 100,
    icon: "📱",
    gradient: "from-emerald-500 to-teal-600",
    tag: "Completed",
  },
];

const activities = [
  {
    icon: "✨",
    title: "Workspace is ready",
    description: "Your personal dashboard is ready to use.",
    time: "Today",
    color: "bg-violet-100 text-violet-800",
  },
  {
    icon: "🔐",
    title: "Authentication connected",
    description: "Your account is protected by Clerk.",
    time: "Today",
    color: "bg-purple-100 text-purple-800",
  },
  {
    icon: "🚀",
    title: "Keep making progress",
    description: "Complete a task to update your progress.",
    time: "Anytime",
    color: "bg-emerald-100 text-emerald-800",
  },
];

const priorityStyles = {
  High: "bg-rose-100 text-rose-800",
  Medium: "bg-amber-100 text-amber-900",
  Low: "bg-sky-100 text-sky-900",
};

const categories = ["Development", "Design", "Testing", "Personal"];

function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [tasks, setTasks] = useState(initialTasks);
  const [tasksReady, setTasksReady] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState("Development");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editCategory, setEditCategory] = useState("Development");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const storageKey = user?.id
    ? `authflow-tasks-${user.id}`
    : null;

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !storageKey) {
      setTasksReady(false);
      return;
    }

    setTasksReady(false);

    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const parsed = JSON.parse(saved);
        setTasks(Array.isArray(parsed) ? parsed : initialTasks);
      } else {
        setTasks(initialTasks);
      }
    } catch {
      setTasks(initialTasks);
    }

    setTasksReady(true);
  }, [isLoaded, isSignedIn, storageKey]);

  useEffect(() => {
    if (!tasksReady || !storageKey) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch {
      // Local storage may be unavailable.
    }
  }, [tasks, tasksReady, storageKey]);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const firstName =
    user?.firstName ||
    user?.username ||
    user?.fullName?.split(" ")[0] ||
    "Developer";

  const page = isDark
    ? "bg-slate-950 text-slate-100"
    : "bg-[#f4f6fc] text-slate-950";

  const surface = isDark
    ? "border-slate-700 bg-slate-900"
    : "border-slate-200 bg-white";

  const border = isDark
    ? "border-slate-700"
    : "border-slate-200";

  const secondary = isDark
    ? "text-slate-300"
    : "text-slate-600";

  const field = isDark
    ? "border-slate-600 bg-slate-950 text-white placeholder:text-slate-400"
    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-500";

  const mutedSurface = isDark
    ? "bg-slate-950"
    : "bg-slate-50";

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && task.completed) ||
        (filter === "Pending" && !task.completed);

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  }

  function addTask(event) {
    event.preventDefault();

    const title = newTask.trim();
    if (!title) return;

    setTasks((current) => [
      {
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        title,
        completed: false,
        priority: newPriority,
        category: newCategory,
      },
      ...current,
    ]);

    setNewTask("");
    setNewPriority("Medium");
    setNewCategory("Development");
    setShowAddForm(false);
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );

    if (editingTask === id) {
      setEditingTask(null);
      setEditTitle("");
    }
  }

  function startEditing(task) {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditPriority(task.priority || "Medium");
    setEditCategory(task.category || "Development");
  }

  function saveEdit(event) {
    event.preventDefault();

    const title = editTitle.trim();
    if (!title) return;

    setTasks((current) =>
      current.map((task) =>
        task.id === editingTask
          ? {
              ...task,
              title,
              priority: editPriority,
              category: editCategory,
            }
          : task
      )
    );

    setEditingTask(null);
    setEditTitle("");
  }

  const navigation = [
    { label: "Overview", id: "overview", icon: "◫" },
    { label: "My Projects", id: "projects", icon: "▦" },
    { label: "My Tasks", id: "tasks-section", icon: "✓" },
    { label: "Activity", id: "activity-section", icon: "◷" },
  ];

  if (!isLoaded) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${page}`}
      >
        <div className="text-center">
          <div
            className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-200"
            style={{ borderTopColor: BRAND }}
          />
          <p className={`mt-4 font-semibold ${secondary}`}>
            Preparing your workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center px-5 ${page}`}
      >
        <div
          className={`w-full max-w-md rounded-3xl border p-8 text-center shadow-xl ${surface}`}
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-black text-white shadow-lg"
            style={{ backgroundColor: BRAND }}
          >
            A
          </div>

          <h1 className="mt-6 text-2xl font-black">
            Welcome to AuthFlow
          </h1>

          <p className={`mt-3 text-sm leading-6 ${secondary}`}>
            Sign in to open your personal workspace and manage your
            tasks.
          </p>

          <SignInButton
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          >
            <button
              className="mt-6 w-full rounded-xl px-5 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = BRAND_HOVER;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = BRAND;
              }}
            >
              Sign in to continue →
            </button>
          </SignInButton>

          <a
            href="/"
            className={`mt-5 inline-block text-sm font-semibold transition hover:text-[#2F0F6D] ${secondary}`}
          >
            ← Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${page}`}>
      <style>{`
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #7040B8 transparent;
        }
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #7040B8;
          border-radius: 999px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #A78BFA;
        }
      `}</style>
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto overscroll-contain sidebar-scroll border-r shadow-2xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
            isDark
              ? "border-slate-800 bg-black text-white"
              : "border-slate-200 bg-white text-slate-900"
          } ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Brand */}
          <a
            href="/"
            className="flex shrink-0 items-center gap-3 px-6 py-7"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-lg"
              style={{ backgroundColor: BRAND }}
            >
              A
            </div>

            <div>
               <h1
  className={`text-xl font-black tracking-tight ${
    isDark ? "text-white" : "text-slate-950"
  }`}
>
  Auth
  <span
    className={isDark ? "text-white" : "text-[#2F0F6D]"}
  >
    Flow
  </span>
</h1>

              <p
                className={`mt-1 text-xs font-semibold ${
                  isDark ? "text-purple-100" : "text-slate-600"
                }`}
              >
                Your space to do more
              </p>
            </div>
          </a>

          {/* Navigation */}
          <div className="px-4">
            <p
              className={`mb-3 px-3 text-[11px] font-extrabold uppercase tracking-[0.18em] ${
                isDark ? "text-purple-200" : "text-slate-500"
              }`}
            >
              Workspace
            </p>

            <nav className="space-y-1.5">
              {navigation.map((item) => {
                const isActive = item.id === "overview";

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                      isActive
                        ? "bg-[#2F0F6D] text-white shadow-lg"
                        : isDark
                          ? "text-purple-100 hover:bg-white/15 hover:text-white"
                          : "text-slate-700 hover:bg-[#2F0F6D]/10 hover:text-[#2F0F6D]"
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center text-lg">
                      {item.icon}
                    </span>

                    <span>{item.label}</span>

                    {item.label === "My Tasks" && (
                      <span
                        className={`ml-auto rounded-full px-2.5 py-1 text-xs font-extrabold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : isDark
                              ? "bg-white/20 text-white"
                              : "bg-[#2F0F6D]/10 text-[#2F0F6D]"
                        }`}
                      >
                        {pendingCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Progress */}
          <div className="mt-8 px-4">
            <p
              className={`mb-3 px-3 text-[11px] font-extrabold uppercase tracking-[0.18em] ${
                isDark ? "text-purple-200" : "text-slate-500"
              }`}
            >
              Your progress
            </p>

            <div
              className={`rounded-2xl border p-4 shadow-sm ${
                isDark
                  ? "border-white/15 bg-white/10"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-sm font-extrabold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Tasks completed
                </span>

                <span
                  className="text-sm font-black text-[#2F0F6D]"
                  style={isDark ? { color: "#E9D5FF" } : undefined}
                >
                  {progress}%
                </span>
              </div>

              <div
                className={`mt-3 h-3 overflow-hidden rounded-full ${
                  isDark ? "bg-black/30" : "bg-slate-200"
                }`}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: BRAND,
                  }}
                />
              </div>

              <p
                className={`mt-3 text-xs font-semibold ${
                  isDark ? "text-purple-100" : "text-slate-600"
                }`}
              >
                {completedCount} of {tasks.length} tasks completed
              </p>
            </div>
          </div>

          {/* Welcome note */}
          <div className="mt-auto p-4">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/15 p-5 text-white shadow-xl"
              style={{ backgroundColor: BRAND }}
            >
              <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/15" />

              <div className="relative text-2xl">✦</div>

              <h3 className="relative mt-3 font-extrabold text-white">
                Dream big. Do more.
              </h3>

              <p className="relative mt-2 text-xs font-medium leading-5 text-white/90">
                Little steps every day create amazing results.
              </p>

              <button
                type="button"
                onClick={() => scrollToSection("tasks-section")}
                className="relative mt-4 rounded-lg bg-white/20 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/30"
              >
                Get things done →
              </button>
            </div>

            <a
              href="/"
              className={`mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                isDark
                  ? "text-purple-100 hover:bg-white/10 hover:text-white"
                  : "text-slate-700 hover:bg-[#2F0F6D]/10 hover:text-[#2F0F6D]"
              }`}
            >
              ↖ Back to website
            </a>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {menuOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-slate-950/60 md:hidden"
          />
        )}

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <header
            className={`sticky top-0 z-20 flex items-center justify-between gap-3 border-b px-4 py-4 backdrop-blur-xl sm:px-7 lg:px-10 ${
              isDark
                ? "border-slate-700 bg-slate-950/95"
                : "border-slate-200 bg-white/95"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                aria-label="Toggle navigation"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg md:hidden ${border}`}
              >
                ☰
              </button>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-black tracking-tight sm:text-xl">
                  My Dashboard
                </h2>

                <p className={`mt-0.5 hidden text-xs font-medium sm:block ${secondary}`}>
                  Your workspace at a glance
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark and light mode"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition hover:scale-105 ${border} ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                {isDark ? "☀️" : "🌙"}
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("activity-section")}
                title="Recent activity"
                aria-label="Go to recent activity"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${border} ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                ◷
              </button>

              <div
                className={`hidden h-8 w-px sm:block ${
                  isDark ? "bg-slate-700" : "bg-slate-200"
                }`}
              />

              <UserButton />
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-8 p-4 sm:p-7 lg:p-10">
            {/* WELCOME SECTION */}
            <section
              id="overview"
              className="relative isolate scroll-mt-24 overflow-hidden rounded-3xl border border-white/15 p-6 shadow-2xl sm:p-8 lg:p-10"
              style={{
                background: "linear-gradient(135deg, #160B3D, #2F0F6D, #7040B8)",
              }}
            >
              <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-purple-500/30 blur-3xl" />

              <div className="relative z-10 flex min-h-52 flex-col justify-between gap-8 sm:flex-row sm:items-center">
                <div className="max-w-xl">
                  <p className="mb-3 text-sm font-bold tracking-wide text-purple-200">
                    Welcome to AuthFlow
                  </p>

                  <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Hello,{" "}
                    <span className="bg-gradient-to-r from-purple-200 to-pink-300 bg-clip-text text-transparent">
                      {firstName}
                    </span>
                    !
                  </h1>

                  <p className="mt-4 max-w-md text-sm font-medium leading-6 text-purple-100 sm:text-base">
                    Your workspace, your progress. Manage your tasks
                    and turn your goals into achievements.
                  </p>

                  <button
                    type="button"
                    onClick={() => scrollToSection("tasks-section")}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#2F0F6D] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-purple-100"
                  >
                    Explore Tasks <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center sm:mx-0 sm:h-44 sm:w-44">
                  <div className="absolute inset-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm" />
                  <div className="absolute inset-4 rounded-full border border-purple-300/30" />

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-300 to-fuchsia-500 text-5xl shadow-xl shadow-purple-950/40 transition duration-300 hover:rotate-6 hover:scale-110">
                    🚀
                  </div>

                  <span className="absolute right-2 top-5 h-3 w-3 animate-pulse rounded-full bg-purple-200" />
                  <span className="absolute bottom-5 left-1 h-2.5 w-2.5 rounded-full bg-yellow-300" />
                </div>
              </div>

              <div className="relative mt-7 flex flex-col gap-1 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-extrabold text-white">
                    Ready to make progress?
                  </p>
                  <p className="mt-1 text-sm font-medium text-purple-100">
                    It's easy to create and manage your daily tasks.
                  </p>
                </div>

                <span className="mt-2 text-2xl text-purple-200 sm:mt-0" aria-hidden="true">
                  ✨
                </span>
              </div>
            </section>

            {/* STATISTICS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Total Tasks",
                  value: tasks.length,
                  note: "Across your workspace",
                  icon: "▤",
                  iconClass: "bg-purple-100 text-[#2F0F6D]",
                  accent: "from-[#2F0F6D] to-[#7040B8]",
                },
                {
                  title: "Completed",
                  value: completedCount,
                  note: "Look at you go!",
                  icon: "✓",
                  iconClass: "bg-emerald-100 text-emerald-800",
                  accent: "from-emerald-400 to-teal-500",
                },
                {
                  title: "Pending",
                  value: pendingCount,
                  note: "Ready for your focus",
                  icon: "◷",
                  iconClass: "bg-amber-100 text-amber-900",
                  accent: "from-amber-400 to-orange-500",
                },
                {
                  title: "Productivity",
                  value: `${progress}%`,
                  note: "Your completion rate",
                  icon: "↗",
                  iconClass: "bg-violet-100 text-violet-800",
                  accent: "from-[#4B208B] to-[#A78BFA]",
                },
              ].map((stat) => (
                <article
                  key={stat.title}
                  className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${surface}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`} />

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-sm font-bold ${secondary}`}>
                        {stat.title}
                      </p>
                      <p className="mt-4 text-3xl font-black tracking-tight">
                        {stat.value}
                      </p>
                    </div>

                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${stat.iconClass}`}>
                      {stat.icon}
                    </div>
                  </div>

                  <p className={`mt-3 text-xs font-medium ${secondary}`}>
                    {stat.note}
                  </p>
                </article>
              ))}
            </section>

            {/* PROJECTS */}
            <section id="projects" className="scroll-mt-24">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2F0F6D]">
                    YOUR WORK
                  </p>
                  <h2 className="mt-1 text-xl font-black sm:text-2xl">
                    Recent projects
                  </h2>
                  <p className={`mt-1 text-sm font-medium ${secondary}`}>
                    Keep your ideas moving forward.
                  </p>
                </div>

                <span className={`hidden rounded-xl border px-3 py-2 text-xs font-bold sm:inline-flex ${border}`}>
                  {projects.length} projects
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <article
                    key={project.title}
                    className={`group rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${surface}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-md ${project.gradient}`}>
                        {project.icon}
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          project.progress === 100
                            ? "bg-emerald-100 text-emerald-800"
                            : isDark
                              ? "bg-violet-950 text-violet-200"
                              : "bg-violet-100 text-violet-900"
                        }`}
                      >
                        {project.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-extrabold">
                      {project.title}
                    </h3>

                    <p className={`mt-1 text-sm font-medium ${secondary}`}>
                      {project.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between text-xs">
                      <span className={secondary}>Project progress</span>
                      <span className="font-extrabold">
                        {project.progress}%
                      </span>
                    </div>

                    <div className={`mt-2 h-2.5 overflow-hidden rounded-full ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${project.gradient} transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* TASK MANAGER */}
            <section
              id="tasks-section"
              className="flex scroll-mt-24 flex-col gap-6"
            >
              <div className={`w-full rounded-2xl border p-5 shadow-sm sm:p-7 ${surface}`}>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2F0F6D]">
                      STAY ON TRACK
                    </p>

                    <h2 className="mt-1 text-xl font-black sm:text-2xl">
                      My tasks
                    </h2>

                    <p className={`mt-1 text-sm font-medium ${secondary}`}>
                      Plan your work, one step at a time.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddForm((value) => !value)}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#2F0F6D] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#42169A]"
                  >
                    {showAddForm ? "✕ Close" : "+ New task"}
                  </button>
                </div>

                {/* Add task form */}
                {showAddForm && (
                  <form
                    onSubmit={addTask}
                    className={`mt-5 rounded-2xl border p-4 sm:p-5 ${border} ${mutedSurface}`}
                  >
                    <label
                      className="mb-2 block text-sm font-bold"
                      htmlFor="new-task-title"
                    >
                      What do you need to do?
                    </label>

                    <input
                      id="new-task-title"
                      autoFocus
                      value={newTask}
                      onChange={(event) => setNewTask(event.target.value)}
                      placeholder="e.g. Finish the landing page"
                      className={`w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none transition focus:border-[#2F0F6D] focus:ring-2 focus:ring-[#2F0F6D]/20 ${field}`}
                      required
                    />

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label
                          className={`mb-2 block text-xs font-bold ${secondary}`}
                          htmlFor="new-task-priority"
                        >
                          Priority
                        </label>

                        <select
                          id="new-task-priority"
                          value={newPriority}
                          onChange={(event) => setNewPriority(event.target.value)}
                          className={`w-full rounded-xl border px-3 py-3 text-sm font-semibold outline-none focus:border-[#2F0F6D] ${field}`}
                        >
                          <option value="High">High priority</option>
                          <option value="Medium">Medium priority</option>
                          <option value="Low">Low priority</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`mb-2 block text-xs font-bold ${secondary}`}
                          htmlFor="new-task-category"
                        >
                          Category
                        </label>

                        <select
                          id="new-task-category"
                          value={newCategory}
                          onChange={(event) => setNewCategory(event.target.value)}
                          className={`w-full rounded-xl border px-3 py-3 text-sm font-semibold outline-none focus:border-[#2F0F6D] ${field}`}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="submit"
                        className="rounded-xl bg-[#2F0F6D] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#42169A]"
                      >
                        Save task
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className={`rounded-xl border px-5 py-2.5 text-sm font-bold ${border}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Search and filters */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl ${secondary}`}>
                      ⌕
                    </span>

                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search your tasks..."
                      aria-label="Search tasks"
                      className={`w-full rounded-xl border py-3 pl-9 pr-3 text-sm font-medium outline-none focus:border-[#2F0F6D] ${field}`}
                    />
                  </div>

                  <select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    aria-label="Filter tasks"
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold outline-none focus:border-[#2F0F6D] ${field}`}
                  >
                    <option>All</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>

                {/* Task list */}
                <div className="mt-5 space-y-3">
                  {filteredTasks.map((task) => (
                    <article
                      key={task.id}
                      className={`rounded-2xl border p-4 transition hover:border-[#2F0F6D] ${border} ${
                        isDark ? "bg-slate-950" : "bg-white"
                      }`}
                    >
                      {editingTask === task.id ? (
                        <form onSubmit={saveEdit} className="space-y-3">
                          <input
                            autoFocus
                            value={editTitle}
                            onChange={(event) => setEditTitle(event.target.value)}
                            aria-label="Edit task title"
                            className={`w-full rounded-xl border px-3 py-2.5 text-sm font-medium outline-none focus:border-[#2F0F6D] ${field}`}
                            required
                          />

                          <div className="grid gap-3 sm:grid-cols-2">
                            <select
                              value={editPriority}
                              onChange={(event) => setEditPriority(event.target.value)}
                              aria-label="Edit priority"
                              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${field}`}
                            >
                              <option value="High">High priority</option>
                              <option value="Medium">Medium priority</option>
                              <option value="Low">Low priority</option>
                            </select>

                            <select
                              value={editCategory}
                              onChange={(event) => setEditCategory(event.target.value)}
                              aria-label="Edit category"
                              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${field}`}
                            >
                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="rounded-lg bg-[#2F0F6D] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#42169A]"
                            >
                              Save changes
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingTask(null);
                                setEditTitle("");
                              }}
                              className={`rounded-lg border px-4 py-2 text-xs font-bold ${border}`}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => toggleTask(task.id)}
                            aria-label={
                              task.completed
                                ? "Mark task pending"
                                : "Mark task completed"
                            }
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-xs font-black transition ${
                              task.completed
                                ? "border-[#2F0F6D] bg-[#2F0F6D] text-white"
                                : isDark
                                  ? "border-slate-500 hover:border-[#7040B8]"
                                  : "border-slate-400 hover:border-[#2F0F6D]"
                            }`}
                          >
                            {task.completed ? "✓" : ""}
                          </button>

                          <div className="min-w-0 flex-1">
                            <p
                              className={`break-words text-sm font-bold ${
                                task.completed
                                  ? `line-through ${secondary}`
                                  : isDark
                                    ? "text-slate-100"
                                    : "text-slate-950"
                              }`}
                            >
                              {task.title}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                                  priorityStyles[task.priority] ||
                                  priorityStyles.Medium
                                }`}
                              >
                                {task.priority || "Medium"}
                              </span>

                              <span className={`text-xs font-semibold ${secondary}`}>
                                {task.category || "General"}
                              </span>

                              {task.completed && (
                                <span className="text-xs font-bold text-emerald-600">
                                  Completed
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => startEditing(task)}
                              title="Edit task"
                              aria-label="Edit task"
                              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                                isDark
                                  ? "hover:bg-slate-800"
                                  : "hover:bg-slate-100"
                              }`}
                            >
                              ✎
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteTask(task.id)}
                              title="Delete task"
                              aria-label="Delete task"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-rose-600 hover:bg-rose-100"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}

                  {filteredTasks.length === 0 && (
                    <div
                      className={`rounded-2xl border border-dashed px-5 py-10 text-center ${border}`}
                    >
                      <div className="text-3xl">📝</div>

                      <p className="mt-3 font-bold">
                        No tasks found
                      </p>

                      <p className={`mt-1 text-sm font-medium ${secondary}`}>
                        Try a different search or add a new task.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(true);
                          setSearch("");
                          setFilter("All");
                        }}
                        className="mt-4 text-sm font-extrabold text-[#2F0F6D] hover:text-[#42169A]"
                      >
                        + Create a task
                      </button>
                    </div>
                  )}
                </div>

                {/* Task summary */}
                <div
                  className={`mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs font-semibold ${border} ${secondary}`}
                >
                  <span>{filteredTasks.length} task(s) shown</span>
                  <span>
                    {completedCount} completed · {pendingCount} pending
                  </span>
                </div>
              </div>
            </section>

            {/* RECENT ACTIVITY */}
            <section
              id="activity-section"
              className={`w-full scroll-mt-24 rounded-2xl border p-5 shadow-sm sm:p-7 ${surface}`}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2F0F6D]">
                THE LATEST
              </p>

              <h2 className="mt-1 text-xl font-black">
                Recent activity
              </h2>

              <p className={`mt-1 text-sm font-medium ${secondary}`}>
                A little progress goes a long way.
              </p>

              <div className="mt-6 space-y-5">
                {activities.map((activity, index) => (
                  <div key={activity.title} className="flex gap-3">
                    <div className="relative">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${activity.color}`}>
                        {activity.icon}
                      </div>

                      {index !== activities.length - 1 && (
                        <div
                          className={`absolute left-1/2 top-12 h-6 w-px -translate-x-1/2 ${
                            isDark ? "bg-slate-700" : "bg-slate-300"
                          }`}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 pb-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-sm font-extrabold">
                          {activity.title}
                        </h3>

                        <span className={`text-xs font-semibold ${secondary}`}>
                          {activity.time}
                        </span>
                      </div>

                      <p className={`mt-1 text-sm leading-5 ${secondary}`}>
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-6 rounded-2xl p-4 ${
                  isDark ? "bg-[#2F0F6D]/40" : "bg-purple-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">💜</span>
                  <p className="text-sm font-extrabold">
                    Your daily reminder
                  </p>
                </div>

                <p className={`mt-2 text-sm leading-5 ${secondary}`}>
                  Focus on progress, not perfection. Every completed
                  task counts.
                </p>
              </div>
            </section>

            {/* FOOTER */}
            <footer
              className={`flex flex-col justify-between gap-3 border-t py-5 text-xs font-medium sm:flex-row sm:items-center ${border} ${secondary}`}
            >
              <p>
                © {new Date().getFullYear()} AuthFlow. Made for your
                next big idea.
              </p>

              <a
                href="/"
                className="font-bold transition hover:text-[#2F0F6D]"
              >
                Back to home ↑
              </a>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
