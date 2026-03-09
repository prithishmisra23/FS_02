import React, { useState, useEffect } from 'react';
import { Plus, Users, UserPlus, PhoneCall, CheckCircle, Sidebar as SidebarIcon, Menu, Bell, Search, LayoutDashboard, Database, Settings, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { getLeads, createLead, updateLead, deleteLead } from '../services/api';
import LeadCard from '../components/LeadCard';
import LeadTable from '../components/LeadTable';
import LeadForm from '../components/LeadForm';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data } = await getLeads();
      setLeads(data);
    } catch (err) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (leadData) => {
    try {
      const { data } = await createLead(leadData);
      setLeads([data, ...leads]);
      toast.success('Lead added successfully');
    } catch (err) {
      toast.error('Failed to add lead');
      throw err;
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await updateLead(id, { status });
      setLeads(leads.map(lead => lead._id === id ? data : lead));
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
        setLeads(leads.filter(lead => lead._id !== id));
        toast.success('Lead deleted successfully');
      } catch (err) {
        toast.error('Failed to delete lead');
      }
    }
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans text-gray-900">
      <Toaster position="top-right" toastOptions={{ duration: 3000, className: 'rounded-xl font-medium' }} />
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-100 z-40 transition-all duration-300 overflow-hidden ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="h-full flex flex-col py-6">
          <div className="px-6 flex items-center gap-2 mb-10 overflow-hidden whitespace-nowrap">
             <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg text-white font-bold text-lg">L</div>
             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">LeadFlow</span>
          </div>

          <nav className="flex-1 space-y-1 px-4 overflow-hidden">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Database, label: 'Leads', active: false },
              { icon: Settings, label: 'Settings', active: false },
            ].map((item) => (
              <a 
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all group overflow-hidden whitespace-nowrap ${item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <item.icon size={20} className={item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600 transition-colors'} />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="px-4 mt-auto overflow-hidden">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 font-semibold rounded-xl transition-all group overflow-hidden whitespace-nowrap">
              <LogOut size={20} className="text-gray-400 group-hover:text-red-600 transition-colors" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 flex flex-col min-h-0 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Navbar */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group/search hidden md:block">
               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-blue-500 transition-colors" />
               <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-gray-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium w-64 focus:ring-4 focus:ring-blue-100 outline-none transition-all group-focus-within/search:bg-white"
               />
            </div>
            <button className="p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all relative">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 border border-white shadow-sm flex items-center justify-center text-white font-bold">PM</div>
          </div>
        </header>

        <section className="p-8 pb-32 overflow-y-auto w-full max-w-[1600px] mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Lead Dashboard</h2>
              <p className="text-gray-500 font-medium text-sm mt-1">Manage your business leads from one central place.</p>
            </div>
            <button
               onClick={() => setShowModal(true)}
               className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-95 group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              Add New Lead
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <LeadCard title="Total Leads" count={stats.total} icon={Users} color="purple" />
            <LeadCard title="New Leads" count={stats.new} icon={UserPlus} color="blue" />
            <LeadCard title="Contacted" count={stats.contacted} icon={PhoneCall} color="yellow" />
            <LeadCard title="Converted" count={stats.converted} icon={CheckCircle} color="green" />
          </div>

          {/* Leads Table Section */}
          <div className="flex flex-col h-full min-h-0">
            <LeadTable leads={leads} onUpdateStatus={handleUpdateStatus} onDeleteLead={handleDeleteLead} />
          </div>
        </section>
      </main>

      {/* Add Lead Modal */}
      {showModal && (
        <LeadForm 
          onClose={() => setShowModal(false)} 
          onSuccess={handleAddLead} 
        />
      )}
    </div>
  );
};

export default Dashboard;
