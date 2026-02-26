'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, projectName }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-6 w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Delete Project?</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-700">"{projectName}"</span>? This action cannot be undone.
        </p>

        {/* Button Layout */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
