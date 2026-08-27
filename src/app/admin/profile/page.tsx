'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, Mail, User, Save, CheckCircle2, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';

export default function AdminProfileSecurity() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    lastUpdated: ''
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setProfile(data.user);
          setNewEmail(data.user.email);
          setNewName(data.user.name);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('New password and confirm password do not match!');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/admin/change-credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newEmail,
          newName,
          newPassword: newPassword || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update credentials');
      }

      setMessage('Security credentials updated successfully! Use your new ID/Password for future logins.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      fetchProfile();
    } catch (err: any) {
      setError(err.message || 'Error updating credentials');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Account & Access Control</span>
        <h1 className="text-2xl font-extrabold text-white">Admin Credentials & Security</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Change your Admin Login Email ID, Password, and profile details.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-teal-950/80 border border-teal-800 text-teal-300 rounded-2xl flex items-center gap-2 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-400" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 text-red-300 rounded-2xl flex items-center gap-2 text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Security Form Card */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        
        <form onSubmit={handleSaveSecurity} className="space-y-6 text-xs sm:text-sm">
          
          {/* Section 1: Admin Identity */}
          <div className="space-y-4 border-b border-slate-800 pb-6">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <User className="w-4 h-4 text-teal-400" />
              <span>Admin Profile Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Admin Display Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Pacific Care Administrator"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Admin Login Email ID *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Change Password */}
          <div className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-teal-400" />
                <span>Change Password (Leave blank to keep unchanged)</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPass ? 'Hide' : 'Show'} Passwords</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">New Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Confirm New Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Current Password Verification */}
          <div className="space-y-3 bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
              Verify Current Password to Save *
            </label>
            <p className="text-xs text-slate-400">
              For security protection, enter your current password to authorize any changes to your ID or password.
            </p>
            <div className="relative max-w-md">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password (default: Admin@123)"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-600/30 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer text-sm"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Admin Credentials</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
