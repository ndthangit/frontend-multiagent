import type { Document } from '../types';

interface DocumentCardProps {
  document: Document;
  onRemove: (id: string) => void;
}

function getFileIcon(fileType: string): string {
  const type = fileType.toLowerCase();
  if (type.includes('pdf')) return '📄';
  if (type.includes('doc') || type.includes('word')) return '📝';
  if (type.includes('txt') || type.includes('text')) return '📃';
  if (type.includes('xls') || type.includes('sheet')) return '📊';
  if (type.includes('ppt') || type.includes('presentation')) return '📊';
  if (type.includes('image') || type.includes('png') || type.includes('jpg') || type.includes('jpeg')) return '🖼️';
  return '📎';
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return 'Yesterday';

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getStatusColor(status: Document['status']): string {
  switch (status) {
    case 'ready': return 'var(--success-green)';
    case 'processing': return 'var(--warning-yellow)';
    case 'uploading': return 'var(--primary-blue)';
    case 'error': return 'var(--error-red)';
    default: return 'var(--gray-500)';
  }
}

function getStatusLabel(status: Document['status']): string {
  switch (status) {
    case 'ready': return 'Ready';
    case 'processing': return 'Processing';
    case 'uploading': return 'Uploading';
    case 'error': return 'Error';
    default: return status;
  }
}

export default function DocumentCard({ document, onRemove }: DocumentCardProps) {
  return (
    <div className="document-card">
      <div className="document-card-header">
        <div className="document-icon">
          {getFileIcon(document.fileType)}
        </div>
        <button
          className="document-remove-btn"
          onClick={() => onRemove(document.id)}
          aria-label="Remove document"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="document-info">
        <h4 className="document-name" title={document.fileName}>
          {document.fileName}
        </h4>
        <div className="document-meta">
          <span className="document-size">{formatFileSize(document.fileSize)}</span>
          <span className="document-date">{formatDate(document.uploadDate)}</span>
        </div>
        <div className="document-status">
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(document.status) }}
          >
            {getStatusLabel(document.status)}
          </span>
        </div>
      </div>
    </div>
  );
}
