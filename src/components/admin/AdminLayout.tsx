import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Settings2, Users, FileText, 
  Image as ImageIcon, BarChart3, Settings, Bell, Search, Menu, X, PackageOpen, Layers
} from 'lucide-react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ShoppingBag, label: 'Quote Requests', path: '/admin/quotes' },
  { icon: Settings2, label: 'Configurator', path: '/admin/configurator' },
  { icon: PackageOpen, label: 'Products', path: '/admin/products' },
  { icon: Layers, label: 'Collections', path: '/admin/collections' },
  { icon: ImageIcon, label: 'Projects', path: '/admin/projects' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: FileText, label: 'Blog', path: '/admin/blog' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-black/5 transition-all duration-300 flex flex-col z-20 ${
          isSidebarOpen ? 'w-[280px]' : 'w-[80px]'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-black/5">
          {isSidebarOpen && <span className="font-medium tracking-tight text-lg">ERAYDUŞ OS</span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-black/5 rounded-lg transition-colors mx-auto">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-black/60 hover:bg-black/5 hover:text-black'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            )
          })}
        </div>
        
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center shrink-0">
              <span className="font-medium text-sm">EA</span>
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <div className="text-sm font-medium truncate">Eray Admin</div>
                <div className="text-xs text-black/50 truncate">Super Admin</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input 
              type="text" 
              placeholder="Search anything (Cmd+K)" 
              className="w-full bg-black/5 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-black/60 hover:bg-black/5 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <Link to="/" className="text-sm font-medium px-4 py-2 bg-black text-white rounded-full hover:bg-black/80 transition-colors">
              View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-[#f8f9fa] p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
