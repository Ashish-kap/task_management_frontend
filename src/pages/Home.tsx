import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { TaskList } from "@/components/tasks/task-list";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative mb-8 rounded-xl bg-gradient-to-r from-indigo-50/60 to-purple-50/60 p-6 shadow-2xl shadow-indigo-100/40 dark:from-slate-800/60 dark:to-slate-800/40 dark:shadow-slate-900/80">
        <div className="absolute inset-0 rounded-xl border border-slate-100/30 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.02)_100%)] dark:border-slate-800/50"></div>
        <div className="relative z-10 flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-300">
            Hello {user?.username}!
          </h1>
          <Button 
            onClick={handleLogout} 
            variant="ghost"
            className="group rounded-lg cursor-pointer px-4 py-2 font-semibold text-red-600 transition-all hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-slate-100"
          >
            Logout
            <span className="ml-2 opacity-70 group-hover:opacity-100">→</span>
          </Button>
        </div>
      </div>
      <TaskList />
    </div>
  );
};

export default Home;
