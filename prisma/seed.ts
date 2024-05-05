import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { roundsOfHashing } from "src/users/users.service";

const prisma = new PrismaClient();

async function main() {
        // Criar usuários
        const user1 = await prisma.user.upsert({
          where: { username: 'StellaFaith' },
          update: {
              name: 'Stella Faith',
              password: await bcrypt.hash("EuGostoDeBolo", roundsOfHashing)
          },
          create: {
              email: 'stellafaith.reindeer@gmail.com',
              username: 'StellaFaith',
              password: 'EuGostoDeBolo',
              name: 'Stella Faith'
          },
      });
  
      const user2 = await prisma.user.upsert({
          where: { username: 'JohnDoe' },
          update: {
              password: await bcrypt.hash("JohnDoe", roundsOfHashing)
          },
          create: {
              email: 'john@doe.com',
              username: 'JohnDoe',
              password: 'JohnDoe'
          },
      });
  
      const user3 = await prisma.user.upsert({
          where: { username: 'JohnTeste' },
          update: {},
          create: {
              email: 'john@teste.teste',
              username: 'JohnTeste',
              password: await bcrypt.hash("johnTeste", roundsOfHashing),
          }
      });
  
      // Criar campanha
      const campaign1 = await prisma.campaign.upsert({
        where: { id: '6637b9ae811344c584038082' },
        update: {},
        create: {
            title: "Minha Campanha",
            description: "Descrição da minha campanha",
            gmId: user1.id, 
            players: {
                connect: [
                    { id: user2.id }, 
                    { id: user3.id }, 
                ]
            }
        }
      });
  

    console.log({ user1, user2, user3, campaign1 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });