import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleDrawer = () => {
    if (isMobile) {
      setIsSidebarOpen(!setIsSidebarOpen);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="font-display min-h-screen bg-base-200 dark:bg-backgroundDark">
      {/* Sidebar */}
      {(isSidebarOpen || !isMobile) && (
        <>
          <Sidebar 
          onCloseDrawer={closeSidebar}
          isMobile={isMobile}/>
          {isMobile && isSidebarOpen && (
            <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setIsSidebarOpen(false)}/>
          )}
        </>
      )}
      <div className={!isMobile ? 'lg:ml-80' : ''}>
        <Navbar 
        isDark={isDark}
        onToggleDrawer={toggleDrawer}
        onToggleTheme={toggleTheme}
        isMobile={isMobile}/>
        <main className="flex-1 p-6">
          <StatsCards />
          <Charts />
        </main>
      </div>
    </div>
  )
}

export default App
