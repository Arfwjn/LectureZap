import { PrismaClient } from '@prisma/client'

// Mencegah multiple instances saat pengembangan (hot-reloading)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma