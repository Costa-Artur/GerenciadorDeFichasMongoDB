import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.upsert({
        where: {username: 'StellaFaith'},
        update: {
          name: 'Stella Faith'
        },
        create: {
            email: 'stellafaith.reindeer@gmail.com',
            username: 'StellaFaith',
            password: 'EuGostoDeBolo',
            name: 'Stella Faith'
        },
    });
    
    const user2 = await prisma.user.upsert({
        where: {username: 'JohnDoe'},
        update: {},
        create: {
            email: 'john@doe.com',
            username: 'JohnDoe',
            password: 'JohnDoe'
        },
    });

    console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });