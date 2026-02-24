import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskHistory from '../components/TaskHistory';
import ChatInterface from '../components/ChatInterface';
import KnowledgeBasePanel from '../components/KnowledgeBasePanel';
import StatusIndicator from '../components/StatusIndicator';
import Toast from '../components/Toast';
import { pastConversations, currentConversation } from '../data/mockData';
import type { Document } from '../types';
import '../App.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [selectedConversationId, setSelectedConversationId] = useState('current');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const taskStatus = {
    active: false,
    message: ''
  };

  const handleToastClose = () => {
    setToast({ ...toast, visible: false });
  };

  const handleUploadDocuments = (files: FileList) => {
    const newDocuments: Document[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      fileType: file.type || file.name.split('.').pop() || 'unknown',
      fileSize: file.size,
      status: 'processing' as const,
      uploadDate: new Date()
    }));

    setDocuments(prev => [...prev, ...newDocuments]);

    setToast({
      visible: true,
      message: `${files.length} document${files.length > 1 ? 's' : ''} uploaded successfully!`,
      type: 'success'
    });

    setTimeout(() => {
      setDocuments(prev =>
        prev.map(doc =>
          newDocuments.find(nd => nd.id === doc.id) && doc.status === 'processing'
            ? { ...doc, status: 'ready' as const }
            : doc
        )
      );
    }, 2000);

    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));

    setToast({
      visible: true,
      message: 'Document removed successfully',
      type: 'info'
    });

    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  return (
    <div className="app">
      <StatusIndicator active={taskStatus.active} message={taskStatus.message} />
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={handleToastClose}
      />
      <div className="app-container">
        <TaskHistory
          conversations={pastConversations}
          currentId={selectedConversationId}
          onSelect={setSelectedConversationId}
        />
        <ChatInterface
          messages={currentConversation.messages}
          onSettingsClick={() => navigate('/settings')}
          onAgentsClick={() => navigate('/agents')}
        />
        <KnowledgeBasePanel
          documents={documents}
          onUpload={handleUploadDocuments}
          onRemove={handleRemoveDocument}
        />
      </div>
    </div>
  );
}
