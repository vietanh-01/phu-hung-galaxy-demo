import { optimizeCloudinaryImage } from '@/lib/utils';
import { Partner } from '@prisma/client';

interface PartnersSectionProps {
  partners: Partner[];
}

const PartnersSection = ({ partners }: PartnersSectionProps) => {
  return (
    <section id="partners" className="py-16 bg-[#FDFBF5]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D40] mb-4">Đối tác của chúng tôi</h2>
                <p className="text-[#3C3C3C] max-w-2xl mx-auto">Cùng với sự tin tưởng của nhiều đối tác lớn trong và ngoài nước</p>
            </div>

            {partners.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {partners.map((partner: Partner) => (
                  <div key={partner.id} className="bg-[#EAE3D6] p-6 rounded-lg flex items-center justify-center h-32">
                    <img src={optimizeCloudinaryImage(partner.logoUrl, 'h_64,q_auto,f_auto')} alt={partner.name} className="max-h-16" />
                  </div>
                ))}
              </div>
            )}
        </div>
    </section>
  )
}

export default PartnersSection 