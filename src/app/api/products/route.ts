import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define types for product creation
interface ProductVariant {
  name: string;
  value: string;
  price?: number;
  inventory?: number;
}

export async function GET(request: NextRequest) {
  try {
    // Get search params if any
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const pageSize = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize') as string) : 10;
    const skip = (page - 1) * pageSize;
    
    // Build query filters
    const where = {
      ...(categoryId ? { categoryId } : {}),
      isActive: true,
    };
    
    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        take: limit ?? pageSize,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ]);
    
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        pageSize: limit ?? pageSize,
        pageCount: Math.ceil(total / (limit ?? pageSize)),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, compareAtPrice, images, categoryId, inventory, variants } = body;

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Name, description, price, and categoryId are required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Create product with variants if provided
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
        images: images || [],
        categoryId,
        inventory: inventory || 0,
        variants: variants ? {
          create: variants.map((variant: ProductVariant) => ({
            name: variant.name,
            value: variant.value,
            price: variant.price ? parseFloat(variant.price.toString()) : undefined,
            inventory: variant.inventory || 0,
          })),
        } : undefined,
      },
      include: {
        category: true,
        variants: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
