'use client';

import { useState, useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpen, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from './ui/Button';
import { markContactAsRead } from '@/lib/actions/contact.actions';
import toast from 'react-hot-toast';

interface ContactSubmission {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  readAt?: Date | null;
  createdAt: Date;
}

interface ContactSubmissionCardProps {
  contact: ContactSubmission;
  onMarkAsRead?: (id: string) => void;
}

export default function ContactSubmissionCard({ contact, onMarkAsRead }: ContactSubmissionCardProps) {
  const [isRead, setIsRead] = useState(contact.isRead);
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = () => {
    if (isRead) return;

    startTransition(async () => {
      try {
        const result = await markContactAsRead(contact.id);
        if (result.success) {
          setIsRead(true);
          onMarkAsRead?.(contact.id);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi đánh dấu tin nhắn');
      }
    });
  };

  return (
    <div className={`p-4 rounded-md border transition-all ${
      isRead 
        ? 'bg-gray-50 border-gray-200 opacity-75' 
        : 'bg-white border-blue-200 shadow-sm'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon 
            icon={isRead ? faEnvelopeOpen : faEnvelope} 
            className={isRead ? 'text-gray-400' : 'text-blue-600'} 
          />
          <div>
            <p className={`font-semibold ${isRead ? 'text-gray-600' : 'text-gray-800'}`}>
              {contact.companyName}
            </p>
            <p className={`text-sm ${isRead ? 'text-gray-500' : 'text-gray-600'}`}>
              {contact.email} - {contact.phone}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <p className="text-xs text-gray-400">
            {contact.createdAt.toLocaleDateString('vi-VN', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
          
          {!isRead && (
            <Button
              onClick={handleMarkAsRead}
              disabled={isPending}
              size="sm"
              variant="outline"
              className="flex items-center space-x-1 text-xs"
            >
              {isPending ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                <FontAwesomeIcon icon={faCheck} />
              )}
              <span>{isPending ? 'Đang xử lý...' : 'Đánh dấu đã đọc'}</span>
            </Button>
          )}
          
          {isRead && contact.readAt && (
            <div className="text-xs text-green-600 flex items-center space-x-1">
              <FontAwesomeIcon icon={faCheck} />
              <span>Đã đọc</span>
            </div>
          )}
        </div>
      </div>
      
      <p className={`text-sm mt-2 pt-2 border-t border-gray-200 ${
        isRead ? 'text-gray-600' : 'text-gray-700'
      }`}>
        {contact.message}
      </p>
    </div>
  );
} 