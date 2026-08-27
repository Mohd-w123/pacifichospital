'use client';

import React, { useEffect, useState } from 'react';
import { Users, Plus, Edit2, Trash2, X, Save, CheckCircle2, AlertCircle, Clock, Stethoscope, Award } from 'lucide-react';
import { Doctor } from '@/lib/types';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const emptyDoctor: Omit<Doctor, 'id'> = {
    name: '',
    nameHindi: '',
    designation: 'Consultant Specialist',
    degrees: 'MBBS, MD / MS',
    specialties: ['General Medicine'],
    specialtiesHindi: [],
    experience: '5+ Years Experience',
    opdTimings: 'सुबह 9:00 AM - शाम 8:00 PM',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: '',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    featured: false
  };

  const [formData, setFormData] = useState<any>(emptyDoctor);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content');
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (e) {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setFormData(emptyDoctor);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc: Doctor) => {
    setEditingDoctor(doc);
    setFormData({
      ...doc,
      specialtiesText: doc.specialties.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this doctor?')) return;
    try {
      const res = await fetch(`/api/doctors?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage('Doctor removed successfully');
      fetchDoctors();
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
      const specialtiesArray = typeof formData.specialtiesText === 'string'
        ? formData.specialtiesText.split(',').map((s: string) => s.trim()).filter(Boolean)
        : formData.specialties;

      const payload = {
        ...formData,
        specialties: specialtiesArray
      };
      delete payload.specialtiesText;

      const method = editingDoctor ? 'PUT' : 'POST';
      const res = await fetch('/api/doctors', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save doctor');

      setMessage(editingDoctor ? 'Doctor profile updated!' : 'New doctor added successfully!');
      setIsModalOpen(false);
      fetchDoctors();
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
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Medical Staff</span>
          <h1 className="text-2xl font-extrabold text-white">Doctors & Medical Panel Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Add, update, or remove doctors, their degrees, OPD timings, specialties and photos.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
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

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <img
                    src={doc.photoUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{doc.name}</h3>
                  {doc.nameHindi && (
                    <p className="text-xs font-semibold text-teal-400">{doc.nameHindi}</p>
                  )}
                  <p className="text-xs font-bold text-slate-300 mt-1">{doc.degrees}</p>
                  <p className="text-[11px] text-slate-400">{doc.designation}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>OPD: <strong>{doc.opdTimings}</strong></span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <span className="font-semibold text-teal-400">Experience:</span> {doc.experience}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Specialties:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {doc.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleOpenEdit(doc)}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => handleDelete(doc.id)}
                className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Doctor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor to Pacific Care'}
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
                  <label className="block text-slate-300 font-semibold mb-1">Doctor Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Anjuman Sayyad"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Doctor Name (Hindi)</label>
                  <input
                    type="text"
                    value={formData.nameHindi || ''}
                    onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                    placeholder="e.g. डॉ. अन्जुमन सैय्यद"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Degrees & Qualifications *</label>
                  <input
                    type="text"
                    required
                    value={formData.degrees}
                    onChange={(e) => setFormData({ ...formData, degrees: e.target.value })}
                    placeholder="e.g. MBBS, MS (OBG & GYNAE)"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Senior Consultant - Obstetrics & Gynaecology"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Experience & Background *</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 10+ Years (Ex-Doctor SMS Hospital Jaipur)"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">OPD Consultation Hours *</label>
                  <input
                    type="text"
                    required
                    value={formData.opdTimings}
                    onChange={(e) => setFormData({ ...formData, opdTimings: e.target.value })}
                    placeholder="e.g. सुबह 9:00 AM - शाम 8:00 PM"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  value={formData.photoUrl}
                  onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                  label="Doctor Photo (Upload to Cloudinary - pacific-hms)"
                  folder="pacific-hms/doctors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Specialties (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.specialtiesText !== undefined ? formData.specialtiesText : formData.specialties?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, specialtiesText: e.target.value })}
                  placeholder="High Risk Pregnancy, Normal Delivery, Infertility, Color Doppler Sonography"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Doctor Bio / Description</label>
                <textarea
                  rows={3}
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Detailed information regarding medical expertise..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
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
                  <span>{editingDoctor ? 'Update Doctor' : 'Add Doctor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
