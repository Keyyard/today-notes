import { PrismaClient } from '@prisma/client';

// @ts-expect-error - just leave it any, declaring just take too much time
const prisma = global.prisma || new PrismaClient();

export default prisma;
