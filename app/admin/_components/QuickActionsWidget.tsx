'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTags, faHandshake, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { useRouter } from 'next/navigation';

export default function QuickActionsWidget() {
  const router = useRouter();

  const quickActions = [
    {
      label: 'Thêm sản phẩm',
      icon: faBoxOpen,
      color: 'text-blue-600',
      href: '/admin/products/new'
    },
    {
      label: 'Thêm danh mục',
      icon: faTags,
      color: 'text-green-600',
      href: '/admin/categories/new'
    },
    {
      label: 'Thêm đối tác',
      icon: faHandshake,
      color: 'text-purple-600',
      href: '/admin/partners/new'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faFileAlt} className="text-gray-600" />
          <span>Thao tác nhanh</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center space-y-2 h-20 hover:bg-gray-50"
              onClick={() => router.push(action.href)}
            >
              <FontAwesomeIcon icon={action.icon} className={`text-xl ${action.color}`} />
              <span className="text-sm text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 