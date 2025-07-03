import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DOMPurify from 'isomorphic-dompurify';
import { getContentBlock } from '@/lib/services/contentBlock.service';

const AboutSection = async () => {
  const contentBlock = await getContentBlock('about', 'main');
  const aboutUsContent = contentBlock?.content || 'Chúng tôi tự hào là nhà cung cấp thực phẩm uy tín, mang đến những sản phẩm tươi ngon, an toàn và chất lượng nhất từ khắp nơi trên thế giới. Với cam kết về nguồn gốc rõ ràng và dịch vụ tận tâm, Phú Hưng Galaxy là người bạn đồng hành đáng tin cậy trong mỗi bữa ăn của gia đình bạn.';
  const cleanAboutUsContent = DOMPurify.sanitize(aboutUsContent);

  return (
    <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
                    <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                        alt="Về chúng tôi" className="rounded-xl shadow-lg w-full h-auto" />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D40] mb-6">Về Phú Hưng Galaxy</h2>
                    <div className="prose max-w-none text-[#3C3C3C] mb-6" dangerouslySetInnerHTML={{ __html: cleanAboutUsContent }} />
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="bg-[#EAE3D6] p-2 rounded-full mr-4">
                                <FontAwesomeIcon icon={faCheck} className="text-[#1A2D40]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1A2D40]">Nguồn gốc rõ ràng</h4>
                                <p className="text-[#3C3C3C] text-sm">Tất cả sản phẩm đều có giấy tờ chứng minh nguồn gốc</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-[#EAE3D6] p-2 rounded-full mr-4">
                                <FontAwesomeIcon icon={faCheck} className="text-[#1A2D40]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1A2D40]">Kiểm định chất lượng</h4>
                                <p className="text-[#3C3C3C] text-sm">Mỗi lô hàng đều được kiểm tra nghiêm ngặt</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-[#EAE3D6] p-2 rounded-full mr-4">
                                <FontAwesomeIcon icon={faCheck} className="text-[#1A2D40]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1A2D40]">Chính sách giá tốt</h4>
                                <p className="text-[#3C3C3C] text-sm">Giá cả cạnh tranh với nhiều ưu đãi cho đại lý</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutSection 