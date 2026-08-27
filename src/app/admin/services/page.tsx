'use client';

import React, { useEffect, useState } from 'react';
import { Stethoscope, Plus, Edit2, Trash2, X, Save, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function AdminServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const emptyService: Omit<ServiceItem, 'id'> = {
    title: '',
    titleHindi: '',
    shortDesc: '',
    fullDesc: '<p>Comprehensive clinical diagnosis, treatment procedures, and patient support for this specialty...</p>',
    category: 'clinical',
    icon: 'Stethoscope',
    features: ['24x7 Specialized Care', 'Advanced Medical Equipment'],
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    featured: true
  };

  const [formData, setFormData] = useState<any>(emptyService);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content');
      const data = await res.json();
      setServices(data.services || []);
    } catch (e) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData(emptyService);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (serv: ServiceItem) => {
    setEditingService(serv);
    setFormData({
      ...serv,
      featuresText: serv.features.join('\n')
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this service?')) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('Service removed successfully');
      fetchServices();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const featuresArray = typeof formData.featuresText === 'string'
        ? formData.featuresText.split('\n').map((s: string) => s.trim()).filter(Boolean)
        : formData.features;

      const payload = {
        ...formData,
        features: featuresArray
      };
      delete payload.featuresText;

      const method = editingService ? 'PUT' : 'POST';
      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save service');

      setMessage(editingService ? 'Service updated!' : 'New service created!');
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Clinical Departments</span>
          <h1 className="text-2xl font-extrabold text-white">Services & Specialties Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage hospital departments and their rich clinical descriptions with WYSIWYG editor.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medical Service</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-teal-950/80 border border-teal-800 text-teal-300 rounded-2xl flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 text-red-300 rounded-2xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((serv) => (
          <div
            key={serv.id}
            className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-md flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <img
                src={serv.imageUrl}
                alt={serv.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 text-teal-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-800">
                {serv.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-base text-white">{serv.title}</h3>
                {serv.titleHindi && (
                  <p className="text-xs font-semibold text-teal-400">{serv.titleHindi}</p>
                )}
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{serv.shortDesc}</p>

                <div className="mt-3 space-y-1">
                  {serv.features?.slice(0, 3).map((f, i) => (
                    <p key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span className="line-clamp-1">{f}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleOpenEdit(serv)}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Service</span>
                </button>

                <button
                  onClick={() => handleDelete(serv.id)}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal with RichTextEditor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingService ? 'Edit Medical Service' : 'Add New Medical Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Obstetrics & Gynaecology"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Title (Hindi)</label>
                  <input
                    type="text"
                    value={formData.titleHindi || ''}
                    onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                    placeholder="e.g. स्त्री एवं प्रसूति रोग विभाग"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="clinical">Clinical Department</option>
                    <option value="diagnostic">Diagnostic & Lab</option>
                    <option value="facility">Hospital Facility / Wards</option>
                    <option value="surgery">Surgery & Modular OT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Icon Style</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="HeartHandshake">Heart / Gynaecology</option>
                    <option value="Stethoscope">Stethoscope / Physician</option>
                    <option value="Activity">Activity / Ultrasound</option>
                    <option value="ShieldCheck">Shield / OT</option>
                    <option value="Bed">Bed / Wards</option>
                    <option value="Pill">Pill / Pharmacy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Image link or /images/..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Summary (displayed on cards) *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="Summary shown on cards..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Treatments / Bullet Features (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.featuresText !== undefined ? formData.featuresText : formData.features?.join('\n')}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="Normal Delivery & Maternity Care&#10;High-Risk Pregnancy Management&#10;Color Doppler Sonography"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono text-xs"
                />
              </div>

              {/* Rich Text Editor for Detailed Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Full Detailed Clinical Description *</span>
                  <span className="text-teal-400 font-normal text-xs">Rich Text WYSIWYG</span>
                </label>
                <RichTextEditor
                  value={formData.fullDesc || ''}
                  onChange={(html) => setFormData({ ...formData, fullDesc: html })}
                  minHeight="220px"
                  placeholder="Explain department capabilities, doctor procedures, and patient guidance..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-2 shadow cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingService ? 'Save Service' : 'Add Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
