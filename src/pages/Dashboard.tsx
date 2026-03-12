import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskHistory from '../components/TaskHistory';
import ChatInterface from '../components/ChatInterface';
import KnowledgeBasePanel from '../components/KnowledgeBasePanel';
import StatusIndicator from '../components/StatusIndicator';
import Toast from '../components/Toast';
import { pastConversations, currentConversation } from '../data/mockData';
import type { Document } from '../types';
import { request } from '../api';
import '../App.css';
import { fetchEventSource } from '@microsoft/fetch-event-source';

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

  // Quản lý các AbortController cho kết nối SSE
  const sseControllers = useRef<Map<string, AbortController>>(new Map());

  // Dọn dẹp kết nối SSE khi unmount component
  useEffect(() => {
    return () => {
      sseControllers.current.forEach(controller => controller.abort());
      sseControllers.current.clear();
    };
  }, []);

  const startSSE = async (documentId: string, tempId: string) => {
    if (sseControllers.current.has(documentId)) return;

    const token = localStorage.getItem('access_token');

    console.log(`Starting SSE for document ${documentId} with token:`, token);
    const controller = new AbortController();
    sseControllers.current.set(documentId, controller);

    try {
      await fetchEventSource(`http://localhost:8000/v1/retrieval/sse/${documentId}`, {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'text/event-stream'
        },
        signal: controller.signal,

        onmessage(event) {
          try {
            const data = JSON.parse(event.data);

            if (['completed', 'error', 'unsupported'].includes(data.status)) {
              const newStatus = data.status === 'completed' ? ('ready' as const) : ('error' as const);

              setDocuments(prev =>
                prev.map(doc =>
                  doc.id === documentId || doc.id === tempId
                    ? { ...doc, id: documentId, status: newStatus }
                    : doc
                )
              );

              controller.abort();
              sseControllers.current.delete(documentId);
            }
          } catch (e) {
            console.error('[SSE] failed to parse message:', event.data, e);
          }
        },

        onerror(err) {
          console.error('[SSE] Connection error:', err);
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === documentId || doc.id === tempId ? { ...doc, status: 'error' as const } : doc
            )
          );
          controller.abort();
          sseControllers.current.delete(documentId);
          throw err; // chặn reconnect vô hạn
        }
      });
    } catch (error) {
      console.log('SSE aborted or failed', error);
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, visible: false });
  };

  const handleUploadDocuments = async (files: FileList) => {
    const fileArray = Array.from(files);

    const newDocuments: Document[] = fileArray.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      fileType: file.type || file.name.split('.').pop() || 'unknown',
      fileSize: file.size,
      status: 'uploading' as const,
      uploadDate: new Date()
    }));

    setDocuments(prev => [...prev, ...newDocuments]);

    let successCount = 0;
    let errorCount = 0;

    await Promise.all(
      fileArray.map(async (file, index) => {
        const tempId = newDocuments[index].id;
        const formData = new FormData();
        formData.append('file', file);

        await request<{ message: string; document_id: string }>(
          'POST',
          '/v1/retrieval/upload',
          (res) => {
            const documentId = res.data?.document_id ?? tempId;
            setDocuments(prev =>
              prev.map(doc =>
                doc.id === tempId
                  ? { ...doc, id: documentId, status: 'processing' as const }
                  : doc
              )
            );
            
            // 4. Gọi hàm khởi tạo SSE thay vì WebSocket
            startSSE(documentId, tempId);
            
            successCount++;
          },
          {
            rest: () => {
              setDocuments(prev =>
                prev.map(doc =>
                  doc.id === tempId ? { ...doc, status: 'error' as const } : doc
                )
              );
              errorCount++;
            },
            noResponse: () => {
              setDocuments(prev =>
                prev.map(doc =>
                  doc.id === tempId ? { ...doc, status: 'error' as const } : doc
                )
              );
              errorCount++;
            }
          },
          formData as unknown as never,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      })
    );

    if (successCount > 0) {
      setToast({
        visible: true,
        message: `${successCount} document${successCount > 1 ? 's' : ''} uploaded successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}!`,
        type: errorCount > 0 ? 'info' : 'success'
      });
    } else {
      setToast({
        visible: true,
        message: 'Upload failed. Please try again.',
        type: 'error'
      });
    }

    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
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