import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

// Define types for user creation
interface UserAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    // Get search params if any
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const roleParam = searchParams.get('role');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const pageSize = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize') as string) : 10;
    const skip = (page - 1) * pageSize;
    
    // Convert role string to Role enum if provided
    let roleFilter = undefined;
    if (roleParam === 'ADMIN') {
      roleFilter = Role.ADMIN;
    } else if (roleParam === 'USER') {
      roleFilter = Role.USER;
    }
    
    // Build query filters
    const where = {
      ...(email ? { email: { contains: email } } : {}),
      ...(roleFilter !== undefined ? { role: roleFilter } : {}),
    };
    
    // Get users with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          // Exclude sensitive information like password
          // Include counts of related data
          _count: {
            select: {
              orders: true,
              addresses: true,
            },
          },
        },
        take: limit ?? pageSize,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({ where }),
    ]);
    
    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        pageSize: limit ?? pageSize,
        pageCount: Math.ceil(total / (limit ?? pageSize)),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password, image, role, addresses } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Convert role string to Role enum if provided
    let userRole = undefined;
    if (role === 'ADMIN') {
      userRole = Role.ADMIN;
    } else if (role === 'USER') {
      userRole = Role.USER;
    }
    
    // Create user with addresses if provided
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password, // In a real app, this would be hashed
        image,
        role: userRole,
        addresses: addresses ? {
          create: addresses.map((address: UserAddress) => ({
            name: address.name,
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
            isDefault: address.isDefault || false,
          })),
        } : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
