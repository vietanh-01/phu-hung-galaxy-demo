import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./_components/ui/Card";
import { PageHeader } from "./_components/ui/PageHeader";
import { Button } from "./_components/ui/Button";
import { getCategoriesCount } from "@/lib/services/category.service";
import { getPartnersCount } from "@/lib/services/partner.service";
import { getProductsCount } from "@/lib/services/product.service";
import {
  getRecentContactSubmissions,
  getUnreadContactSubmissionsCount,
  getContactSubmissionsCount
} from "@/lib/services/contact.service";
import { getRecentActivities } from "@/lib/services/dashboard.service";
import ContactSubmissionCard from "./_components/ContactSubmissionCard";
import RecentActivityWidget from "./_components/RecentActivityWidget";
import QuickActionsWidget from "./_components/QuickActionsWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faTags,
  faHandshake,
  faEnvelope,
  faEnvelopeOpen,
  faAddressBook
} from "@fortawesome/free-solid-svg-icons";
import MarkAllReadButton from "./_components/MarkAllReadButton";

function StatCard({ title, value, icon, color = "text-[#1A2D40]" }: { 
  title: string, 
  value: number, 
  icon?: any,
  color?: string 
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-500 flex items-center space-x-2">
          {icon && <FontAwesomeIcon icon={icon} className="text-gray-400" />}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>{value}</div>
      </CardContent>
    </Card>
  );
}



export default async function AdminDashboard() {
  const [
    productsCount, 
    categoriesCount, 
    partnersCount, 
    recentContacts,
    unreadContactsCount,
    totalContactsCount,
    recentActivities
  ] = await Promise.all([
    getProductsCount(),
    getCategoriesCount(),
    getPartnersCount(),
    getRecentContactSubmissions(5),
    getUnreadContactSubmissionsCount(),
    getContactSubmissionsCount(),
    getRecentActivities(5),
  ]);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Tổng quan hoạt động hệ thống" />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Tổng sản phẩm" 
          value={productsCount} 
          icon={faBoxOpen}
          color="text-blue-600"
        />
        <StatCard 
          title="Tổng danh mục" 
          value={categoriesCount} 
          icon={faTags}
          color="text-green-600"
        />
        <StatCard 
          title="Tổng đối tác" 
          value={partnersCount} 
          icon={faHandshake}
          color="text-purple-600"
        />
        <StatCard 
          title="Liên hệ mới" 
          value={unreadContactsCount} 
          icon={faEnvelope}
          color="text-orange-600"
        />
        <StatCard
          title="Tổng số liên hệ"
          value={totalContactsCount}
          icon={faAddressBook}
          color="text-orange-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Submissions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faEnvelopeOpen} className="text-gray-600" />
                <span>Liên hệ mới nhất</span>
                {unreadContactsCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadContactsCount}
                  </span>
                )}
              </CardTitle>
              
                             {unreadContactsCount > 0 && (
                 <MarkAllReadButton />
               )}
            </div>
          </CardHeader>
          <CardContent>
            {recentContacts.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                                 {recentContacts.map((contact: any) => (
                   <ContactSubmissionCard 
                     key={contact.id} 
                     contact={contact}
                   />
                 ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} className="h-12 w-12 mb-3 text-gray-300" />
                <p>Chưa có liên hệ nào gần đây</p>
              </div>
            )}
            
            {totalContactsCount > 5 && (
              <div className="mt-4 pt-4 border-t text-center">
                <Link href="/admin/contacts">
                  <Button variant="outline" size="sm">
                    Xem tất cả liên hệ ({totalContactsCount})
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <RecentActivityWidget activities={recentActivities} />
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <QuickActionsWidget />
      </div>
    </>
  );
} 