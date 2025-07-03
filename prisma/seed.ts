import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

async function main() {
  console.log('Start seeding ...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('adminpassword', saltRounds);

  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@phuhunggalaxy.com' },
    update: {},
    create: {
      email: 'admin@phuhunggalaxy.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Create Categories
  const cat1 = await prisma.category.upsert({
    where: { slug: 'thuc-pham-kho' },
    update: {},
    create: { name: 'Thực phẩm khô', slug: 'thuc-pham-kho' },
  });

  const cat2 = await prisma.category.upsert({
    where: { slug: 'do-hop' },
    update: {},
    create: { name: 'Đồ hộp', slug: 'do-hop' },
  });

  const cat3 = await prisma.category.upsert({
    where: { slug: 'gia-vi' },
    update: {},
    create: { name: 'Gia vị', slug: 'gia-vi' },
  });

  const cat4 = await prisma.category.upsert({
    where: { slug: 'do-dong-lanh' },
    update: {},
    create: { name: 'Đồ đông lạnh', slug: 'do-dong-lanh' },
  });

  console.log('Created categories');

  // Create Products
  await prisma.product.upsert({
    where: { slug: 'hat-dinh-duong-nhap-khau' },
    update: {},
    create: {
      name: 'Hạt dinh dưỡng nhập khẩu',
      slug: 'hat-dinh-duong-nhap-khau',
      description: 'Hạt dinh dưỡng cao cấp nhập khẩu từ Úc, đóng gói 100g',
      price: 30000,
      imageUrl: 'https://images.unsplash.com/photo-1615485737450-6a20b755999b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      batchCode: '102.2023',
      rating: 4.9,
      reviewCount: 245,
      statusTag: 'MỚI',
      categoryId: cat1.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'mat-ong-nguyen-chat' },
    update: {},
    create: {
      name: 'Mật ong nguyên chất',
      slug: 'mat-ong-nguyen-chat',
      description: 'Mật ong nguyên chất 100% từ rừng Tây Nguyên, đóng chai 500ml',
      price: 150000,
      imageUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      batchCode: '56.2023',
      rating: 4.8,
      reviewCount: 378,
      statusTag: 'BÁN CHẠY',
      categoryId: cat1.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'dau-olive-extra-virgin' },
    update: {},
    create: {
      name: 'Dầu olive extra virgin',
      slug: 'dau-olive-extra-virgin',
      description: 'Dầu olive nguyên chất nhập khẩu từ Ý, chai 750ml',
      price: 250000,
      imageUrl: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      batchCode: '34.2023',
      rating: 4.7,
      reviewCount: 156,
      statusTag: null,
      categoryId: cat3.id,
    },
  });

  console.log('Created products');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 