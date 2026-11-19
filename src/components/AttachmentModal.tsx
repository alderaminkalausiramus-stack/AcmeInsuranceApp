import React, { useEffect } from 'react';
import { ClaimAttachment } from '../types/claim';
import { X, FileText, Image as ImageIcon } from 'lucide-react';

interface AttachmentModalProps {
  attachment: ClaimAttachment | null;
  onClose: () => void;
}

export const AttachmentModal: React.FC<AttachmentModalProps> = ({ attachment, onClose }) => {
  useEffect(() => {
    if (!attachment) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [attachment, onClose]);

  if (!attachment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Attachment preview: ${attachment.name}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    >
      <div
        className="bg-white border border-slate-200 rounded-lg max-w-xl w-full overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            {attachment.fileType === 'image' ? (
              <ImageIcon className="w-4 h-4 text-slate-600" />
            ) : (
              <FileText className="w-4 h-4 text-slate-600" />
            )}
            <div>
              <h3 className="text-xs font-semibold text-slate-900">{attachment.name}</h3>
              <p className="text-[11px] text-slate-500">
                {attachment.category} • {attachment.size}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close attachment preview"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 bg-slate-100 flex flex-col items-center justify-center min-h-[260px]">
          {attachment.fileType === 'image' ? (
            <div className="w-full flex flex-col items-center space-y-2">
              <img
                src={attachment.previewUrl || '/damage.jpg'}
                alt={attachment.name}
                className="max-h-[360px] w-auto rounded border border-slate-300 shadow-sm object-contain"
              />
              <p className="text-xs text-slate-600 text-center italic">
                "{attachment.caption}"
              </p>
            </div>
          ) : (
            <div className="text-center p-6 border border-dashed border-slate-300 rounded bg-white max-w-sm w-full shadow-sm">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h4 className="text-xs font-semibold text-slate-900 mb-0.5">{attachment.name}</h4>
              <p className="text-[11px] text-slate-500 mb-3">{attachment.caption}</p>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                {attachment.category} Document
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-200 bg-white flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
