'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Edit2, Trash2, X, Save, CheckCircle2, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';
import { CustomPage } from '@/lib/types';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function AdminPages() {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const emptyPage: Omit<CustomPage, 'id' | 'lastUpdated'> = {
    slug: '',
    title: '',
    subtitle: '',
    content: '<h2>Page Heading</h2><p>Write detailed information about hospital services, maternity packages, or visitor guidelines here...</p>',
    metaDescription: '',
    published: true
  };

  const [formData, setFormData] = useState<any>(emptyPage);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content');
      const data = await res.json();
      setPages(data.customPages || []);
    } catch (e) {
      setError('Failed to load custom pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleOpenAdd = () => {
    setEditingPage(null);
    setFormData(emptyPage);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (page: CustomPage) => {
    setEditingPage(page);
    setFormData(page);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this custom page?')) return;
    try {
      const res = await fetch(`/api/pages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete page');
      setMessage('Page removed successfully');
      fetchPages();
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
      const cleanedSlug = formData.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const payload = {
        ...formData,
        slug: cleanedSlug
      };

      const method = editingPage ? 'PUT' : 'POST';
      const res = await fetch('/api/pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save custom page');

      setMessage(editingPage ? 'Page updated successfully!' : 'New page published!');
      setIsModalOpen(false);
      fetchPages();
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
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Content Management (CMS)</span>
          <h1 className="text-2xl font-extrabold text-white">Create & Manage Dynamic Pages</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Create new custom website pages with rich text formatting (headings, lists, bold, links, callout alerts).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
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

      {/* Pages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal-400 bg-teal-950/70 px-2 py-0.5 rounded border border-teal-800">
                  /page/{page.slug}
                </span>
                <span className="text-[11px] text-slate-400">Updated: {page.lastUpdated}</span>
              </div>

              <h3 className="text-lg font-bold text-white mt-3">{page.title}</h3>
              {page.subtitle && (
                <p className="text-xs text-slate-400 mt-1">{page.subtitle}</p>
              )}

              {/* Rich text snippet preview */}
              <div
                className="text-xs text-slate-400 mt-3 line-clamp-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <Link
                href={`/page/${page.slug}`}
                target="_blank"
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>View Live Page</span>
                <ExternalLink className="w-3 h-3 text-teal-400" />
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenEdit(page)}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit in Rich Text Editor</span>
                </button>

                <button
                  onClick={() => handleDelete(page.id)}
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

      {/* Add / Edit Page Modal with RichTextEditor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <span>{editingPage ? 'Edit Page Content' : 'Create New Website Page'}</span>
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
                  <label className="block text-slate-300 font-semibold mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      setFormData({
                        ...formData,
                        title,
                        slug: editingPage ? formData.slug : slug
                      });
                    }}
                    placeholder="e.g. Maternity & Pregnancy Care Guidelines"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL Slug (Live link: /page/your-slug) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. maternity-care-guidelines"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subtitle / Tagline (Optional)</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Short summary displayed at top of the page..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Rich Text Editor Component */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Page Rich Content Editor *</span>
                  <span className="text-teal-400 font-normal text-xs">Full WYSIWYG formatting</span>
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                  minHeight="280px"
                  placeholder="Write rich formatted page content, add headings, bullets, callout boxes, and links..."
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
                  <span>{editingPage ? 'Save Changes' : 'Publish Live Page'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
