'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBoxOpen, 
  faTags, 
  faHandshake, 
  faEnvelope, 
  faFileAlt,
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface ActivityItem {
  id: string;
  type: 'product' | 'category' | 'partner' | 'contact';
  action: 'created' | 'updated' | 'deleted' | 'received';
  title: string;
  description?: string;
  timestamp: Date;
}

interface RecentActivityWidgetProps {
  activities: ActivityItem[];
}

const getActivityIcon = (type: string, action: string) => {
  const icons = {
    product: faBoxOpen,
    category: faTags,
    partner: faHandshake,
    contact: faEnvelope,
  };

  const actionColors = {
    created: 'text-green-600',
    updated: 'text-blue-600',
    deleted: 'text-red-600',
    received: 'text-purple-600',
  };

  return {
    icon: icons[type as keyof typeof icons] || faFileAlt,
    color: actionColors[action as keyof typeof actionColors] || 'text-gray-600'
  };
};

const getActionIcon = (action: string) => {
  switch (action) {
    case 'created':
      return faPlus;
    case 'updated':
      return faEdit;
    case 'deleted':
      return faTrash;
    case 'received':
      return faEnvelope;
    default:
      return faEdit;
  }
};

const getActionText = (action: string) => {
  switch (action) {
    case 'created':
      return 'đã tạo';
    case 'updated':
      return 'đã cập nhật';
    case 'deleted':
      return 'đã xóa';
    case 'received':
      return 'đã nhận';
    default:
      return 'đã thay đổi';
  }
};

const getTypeText = (type: string) => {
  switch (type) {
    case 'product':
      return 'sản phẩm';
    case 'category':
      return 'danh mục';
    case 'partner':
      return 'đối tác';
    case 'contact':
      return 'liên hệ';
    default:
      return 'mục';
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'vừa xong';
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  
  return date.toLocaleDateString('vi-VN');
};

export default function RecentActivityWidget({ activities }: RecentActivityWidgetProps) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faFileAlt} className="text-gray-600" />
            <span>Hoạt động gần đây</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <FontAwesomeIcon icon={faFileAlt} className="h-12 w-12 mb-3 text-gray-300" />
            <p>Chưa có hoạt động nào gần đây</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faFileAlt} className="text-gray-600" />
          <span>Hoạt động gần đây</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const { icon: typeIcon, color } = getActivityIcon(activity.type, activity.action);
            const actionIcon = getActionIcon(activity.action);
            
            return (
              <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${color}`}>
                  <FontAwesomeIcon icon={typeIcon} className="text-sm" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <FontAwesomeIcon icon={actionIcon} className={`text-xs ${color}`} />
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {getActionText(activity.action)} {getTypeText(activity.type)}
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-800 font-semibold mb-1">
                    {activity.title}
                  </p>
                  
                  {activity.description && (
                    <p className="text-xs text-gray-600 mb-2">
                      {activity.description}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {activities.length >= 5 && (
          <div className="mt-4 text-center">
            <Link href="/admin/products">
              <Button variant="link" className="text-sm font-medium">
                Xem tất cả hoạt động
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 