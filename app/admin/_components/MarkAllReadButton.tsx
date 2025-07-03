'use client';

import { useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from './ui/Button';
import { markAllContactsAsRead } from '@/lib/actions/contact.actions';
import toast from 'react-hot-toast';

export default function MarkAllReadButton() {
  const [isPending, startTransition] = useTransition();

  const handleMarkAllAsRead = () => {
    startTransition(async () => {
      try {
        const result = await markAllContactsAsRead();
        if (result.success) {
          toast.success(result.message);
          // Refresh the page to update the data
          window.location.reload();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi đánh dấu tin nhắn');
      }
    });
  };

  return (
    <Button 
      onClick={handleMarkAllAsRead}
      disabled={isPending}
      variant="outline" 
      size="sm"
      className="flex items-center space-x-1"
    >
      {isPending ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      ) : (
        <FontAwesomeIcon icon={faEye} />
      )}
      <span>{isPending ? 'Đang xử lý...' : 'Đánh dấu tất cả đã đọc'}</span>
    </Button>
  );
} 