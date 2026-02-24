import { useState, useRef } from 'react';
import type { Document } from '../types';
import DocumentCard from './DocumentCard';

interface KnowledgeBasePanelProps {
  documents: Document[];
  onUpload: (files: FileList) => void;
  onRemove: (id: string) => void;
}

export default function KnowledgeBasePanel({ documents, onUpload, onRemove }: KnowledgeBasePanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
      e.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`knowledge-base-panel ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="panel-header">
        <h2 className="panel-title">Knowledge Base</h2>
        <span className="document-count">{documents.length}</span>
      </div>

      <div className="documents-list">
        {documents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <p className="empty-state-text">No documents yet</p>
            <p className="empty-state-subtext">Upload documents to enhance chat context</p>
          </div>
        ) : (
          documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onRemove={onRemove} />
          ))
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.md"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      <button className="upload-document-btn" onClick={handleUploadClick}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Upload Document
      </button>

      {isDragging && (
        <div className="drop-overlay">
          <div className="drop-overlay-content">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 12V36M12 24H36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <p>Drop files here</p>
          </div>
        </div>
      )}
    </div>
  );
}
