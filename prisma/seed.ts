import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();
const main = async () => {
  const data = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: hashSync('123123123', 12),
  };

  await prisma.user.upsert({
    create: {
      ...data,
      permissions: {
        createMany: {
          data: [
            {
              permission: 'admin',
            },
            {
              permission: 'user',
            },
          ],
        },
      },
    },
    update: data,
    where: {
      email: data.email,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
