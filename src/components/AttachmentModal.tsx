import React from 'react';
import { ClaimAttachment } from '../types/claim';
import { FileText } from 'lucide-react';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AttachmentModalProps {
  attachment: ClaimAttachment | null;
  onClose: () => void;
}

export const AttachmentModal: React.FC<AttachmentModalProps> = ({ attachment, onClose }) => {
  if (!attachment) return null;

  return (
    <Dialog
      open={Boolean(attachment)}
      onClose={onClose}
      title={attachment.name}
      description={`${attachment.category} · ${attachment.size}`}
      maxWidthClassName="max-w-xl"
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/40 p-4 flex flex-col items-center justify-center min-h-[240px]">
          {attachment.fileType === 'image' ? (
            <div className="w-full flex flex-col items-center gap-3">
              <img
                src={attachment.previewUrl || '/damage.jpg'}
                alt={attachment.name}
                className="max-h-[360px] w-full rounded-md border border-border object-contain bg-background"
              />
              {attachment.caption && (
                <p className="text-xs text-muted-foreground text-center">{attachment.caption}</p>
              )}
            </div>
          ) : (
            <div className="text-center p-6 rounded-lg border border-dashed border-border bg-background max-w-sm w-full space-y-2">
              <FileText className="h-9 w-9 text-muted-foreground mx-auto" />
              <p className="text-sm font-semibold text-foreground break-all">{attachment.name}</p>
              <p className="text-xs text-muted-foreground">{attachment.caption}</p>
              <Badge variant="secondary">{attachment.category}</Badge>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
