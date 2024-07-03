// admin/user/+page.server.ts
import { PrismaClient } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
  const pendingUsers = await prisma.user.findMany({
    where: { isApproved: false },
    include: { role: true }
  });

  return { pendingUsers };
};

export const actions: Actions = {
  approve: async ({ request }) => {
    const data = await request.formData();
    const userId = data.get('userId') as string;

    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true, status: 'Approved' }
    });

    return { success: true };
  },

  decline: async ({ request }) => {
    const data = await request.formData();
    const userId = data.get('userId') as string;

    await prisma.user.delete({
      where: { id: userId }
    });

    return { success: true };
  }
};