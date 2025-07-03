import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { optimizeCloudinaryImage } from '@/lib/utils';
import DOMPurify from 'isomorphic-dompurify';
import { Category, Product } from '@prisma/client';

interface ProductsSectionProps {
  products: (Product & { category: Category | null })[];
  categories: Category[];
}

const ProductsSection = ({ products, categories }: ProductsSectionProps) => {
  return (
    <section id="products" className="py-16 bg-[#FDFBF5]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D40] mb-4">Danh mục sản phẩm</h2>
                <p className="text-[#3C3C3C] max-w-2xl mx-auto">Chúng tôi cung cấp đa dạng các mặt hàng thực phẩm chất lượng cao với giá thành cạnh tranh</p>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <button className="category-btn bg-[#1A2D40] text-white px-6 py-2 rounded-full font-medium">Tất cả</button>
                  {categories.map((category: Category) => (
                    <button key={category.id} className="category-btn bg-[#EAE3D6] hover:bg-[#1A2D40] hover:text-white px-6 py-2 rounded-full font-medium">
                      {category.name}
                    </button>
                  ))}
              </div>
            )}

            {/* Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: Product) => (
                  <div key={product.id} className="product-card bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="relative overflow-hidden h-56">
                          <img src={optimizeCloudinaryImage(product.imageUrl, 'w_400,q_auto,f_auto')}
                              alt={product.name} className="w-full h-full object-cover" />
                          {product.statusTag && (
                            <div className="absolute top-4 right-4 bg-[#D4A373] text-[#1A2D40] text-xs font-bold px-2 py-1 rounded-full">{product.statusTag}</div>
                          )}
                      </div>
                      <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-[#1A2D40]">{product.name}</h3>
                              <span className="text-[#1A2D40] font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price.toNumber())}</span>
                          </div>
                          {product.description && (
                            <div className="prose prose-sm max-w-none text-[#3C3C3C] mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
                          )}
                          <div className="flex justify-between items-center text-sm">
                              {product.rating && product.reviewCount && (
                                <span className="text-[#D4A373]"><FontAwesomeIcon icon={faStar} /> {product.rating} ({product.reviewCount})</span>
                              )}
                              {product.batchCode && (
                                <span className="text-[#3C3C3C]">Lô: {product.batchCode}</span>
                              )}
                          </div>
                      </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Chưa có sản phẩm nào.</p>
            )}

            <div className="text-center mt-12">
                <button className="border-2 border-[#1A2D40] text-[#1A2D40] hover:bg-[#1A2D40] hover:text-white font-bold py-3 px-8 rounded-full transition">Xem thêm sản phẩm</button>
            </div>
        </div>
    </section>
  )
}

export default ProductsSection 