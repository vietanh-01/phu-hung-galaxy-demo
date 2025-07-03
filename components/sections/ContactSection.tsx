'use client'

import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faBarcode, faClock, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormState, useFormStatus } from 'react-dom'
import { createContactSubmission, type ContactFormState, } from '@/lib/actions/contact.actions'
import { useEffect, useRef } from 'react'

const initialState: ContactFormState = {
  message: '',
  errors: undefined,
  success: false,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="w-full bg-[#1A2D40] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed">
      {pending ? 'Đang gửi...' : 'Gửi yêu cầu'}
    </button>
  )
}

const ContactSection = () => {
  const [state, formAction] = useFormState(createContactSubmission, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <section id="contact" className="py-16 bg-[#FDFBF5]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A2D40] mb-4">Liên hệ hợp tác</h2>
                <p className="text-[#3C3C3C] max-w-2xl mx-auto">Để biết thêm thông tin chi tiết về sản phẩm và chính sách phân phối</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-[#1A2D40] mb-6">Gửi thông tin liên hệ</h3>
                        <form ref={formRef} action={formAction}>
                            <div className="mb-4">
                                <label htmlFor="companyName" className="block text-[#3C3C3C] font-medium mb-2">Tên công ty</label>
                                <input type="text" id="companyName" name="companyName" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]" />
                                {state.errors?.companyName && <p className="text-red-500 text-sm mt-1">{state.errors.companyName[0]}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-[#3C3C3C] font-medium mb-2">Số điện thoại</label>
                                <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]" />
                                {state.errors?.phone && <p className="text-red-500 text-sm mt-1">{state.errors.phone[0]}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-[#3C3C3C] font-medium mb-2">Email</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]" />
                                {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-[#3C3C3C] font-medium mb-2">Nội dung yêu cầu</label>
                                <textarea id="message" name="message" required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]"></textarea>
                                {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>}
                            </div>
                            <SubmitButton />
                            {state.message && (
                                <p className={`mt-4 text-sm ${
                                    state.success ? 'text-green-600' : 'text-red-600'
                                }`}
                                >
                                    {state.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="bg-white p-8 rounded-xl shadow-md h-full">
                        <h3 className="text-xl font-bold text-[#1A2D40] mb-6">Thông tin liên hệ</h3>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-[#EAE3D6] p-3 rounded-full mr-4">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#1A2D40]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1A2D40]">Địa chỉ</h4>
                                    <p className="text-[#3C3C3C]">Số nhà 11, Ngõ 432, Thôn vân Trai, Phố Quảng Oai, Thị Trấn Tây Đằng, Huyện Ba Vì, Thành phố Hà Nội, Việt Nam</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-[#EAE3D6] p-3 rounded-full mr-4">
                                    <FontAwesomeIcon icon={faBarcode} className="text-[#1A2D40]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1A2D40]">Mã số thuế</h4>
                                    <p className="text-[#3C3C3C]">0110163751</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-[#EAE3D6] p-3 rounded-full mr-4">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-[#1A2D40]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1A2D40]">Email</h4>
                                    <p className="text-[#3C3C3C]">phuhunggalaxy@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-[#EAE3D6] p-3 rounded-full mr-4">
                                    <FontAwesomeIcon icon={faClock} className="text-[#1A2D40]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1A2D40]">Giờ làm việc</h4>
                                    <p className="text-[#3C3C3C]">Thứ 2 - Thứ 6: 8h00 - 17h00</p>
                                    <p className="text-[#3C3C3C]">Thứ 7: 8h00 - 12h00</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold text-[#1A2D40] mb-4">Theo dõi chúng tôi</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-[#1A2D40] text-[#D4A373] p-3 rounded-full w-10 h-10 flex items-center justify-center"><FontAwesomeIcon icon={faFacebookF} /></a>
                                <a href="#" className="bg-[#1A2D40] text-[#D4A373] p-3 rounded-full w-10 h-10 flex items-center justify-center"><FontAwesomeIcon icon={faInstagram} /></a>
                                <a href="#" className="bg-[#1A2D40] text-[#D4A373] p-3 rounded-full w-10 h-10 flex items-center justify-center"><FontAwesomeIcon icon={faTwitter} /></a>
                                <a href="#" className="bg-[#1A2D40] text-[#D4A373] p-3 rounded-full w-10 h-10 flex items-center justify-center"><FontAwesomeIcon icon={faYoutube} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactSection 