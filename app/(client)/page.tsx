import AboutSection from '@/components/sections/AboutSection'
import CertificationSection from '@/components/sections/CertificationSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import PartnersSection from '@/components/sections/PartnersSection'
import ProductsSection from '@/components/sections/ProductsSection'
import StatsSection from '@/components/sections/StatsSection'
import { getCategories } from '@/lib/services/category.service'
import { getPartners } from '@/lib/services/partner.service'
import { getProducts } from '@/lib/services/product.service'

export default async function HomePage() {
  const products = await getProducts({ take: 8, include: { category: true } });
  const partners = await getPartners();
  const categories = await getCategories();
  
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProductsSection products={products} categories={categories}/>
      <CertificationSection />
      <PartnersSection partners={partners}/>
      <ContactSection />
    </>
  )
} 