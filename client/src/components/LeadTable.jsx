import React, { useState } from 'react';
import { Trash2, ExternalLink, Calendar, Mail, Tag, Search, Filter } from 'lucide-react';
import StatusBadge from './StatusBadge';

const LeadTable = ({ leads, onUpdateStatus, onDeleteLead }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full bg-white/80 backdrop-blur-md">
      <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-white/50 sticky top-0 z-10">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400 focus-within:bg-white transition-all w-full max-w-sm group">
          <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search leads..."
            className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl transition-all hover:bg-white cursor-pointer group">
          <Filter size={16} className="text-gray-400 group-hover:text-blue-500" />
          <select
            className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 backdrop-blur-sm border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Lead Info</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">{lead.name}</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                        <Mail size={12} />
                        {lead.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <Tag size={14} className="text-gray-400" />
                      {lead.source}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className="bg-transparent border-none outline-none text-xs font-bold cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded transition-all appearance-none"
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead._id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                    <div className="pointer-events-none -mt-0.5">
                      <StatusBadge status={lead.status} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold uppercase tracking-tight">
                      <Calendar size={14} className="text-gray-300" />
                      {formatDate(lead.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onDeleteLead(lead._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group/btn"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-gray-50 rounded-full mb-2">
                        <Search size={32} className="text-gray-200" />
                    </div>
                    No leads found matching your criteria.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
