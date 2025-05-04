import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";

class UsersController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().min(3),
            email: z.string().email(),
            phone: z.string().min(9),
            password: z.string().trim().min(6),
        });

        const { name, email, phone, password } = bodySchema.parse(request.body);

        const userWithSameEmail = await prisma.user.findFirst({
            where: { email },
        });

        if (userWithSameEmail) {
            throw new AppError("User already exists", 409); // 409 = Conflict
        }

        const hashedPassword = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = user;

        return response.status(201).json(userWithoutPassword); 
    }
}

export { UsersController };
