import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

// Define types for order creation
interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  variantInfo?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get search params if any
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const statusParam = searchParams.get('status');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const pageSize = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize') as string) : 10;
    const skip = (page - 1) * pageSize;
    
    // Convert status string to OrderStatus enum if provided
    let statusFilter = undefined;
    if (statusParam) {
      switch (statusParam.toUpperCase()) {
        case 'PENDING':
          statusFilter = OrderStatus.PENDING;
          break;
        case 'PROCESSING':
          statusFilter = OrderStatus.PROCESSING;
          break;
        case 'SHIPPED':
          statusFilter = OrderStatus.SHIPPED;
          break;
        case 'DELIVERED':
          statusFilter = OrderStatus.DELIVERED;
          break;
        case 'CANCELLED':
          statusFilter = OrderStatus.CANCELLED;
          break;
      }
    }
    
    // Build query filters
    const where = {
      ...(userId ? { userId } : {}),
      ...(statusFilter !== undefined ? { status: statusFilter } : {}),
    };
    
    // Get orders with pagination
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
        },
        take: limit ?? pageSize,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.order.count({ where }),
    ]);
    
    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        pageSize: limit ?? pageSize,
        pageCount: Math.ceil(total / (limit ?? pageSize)),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items, shippingAddress, billingAddress, paymentIntent } = body;

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'User ID and at least one order item are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Validate products and calculate total
    const productIds = items.map((item: OrderItem) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'One or more products not found' },
        { status: 404 }
      );
    }

    // Calculate total
    const total = items.reduce((sum: number, item: OrderItem) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        status: OrderStatus.PENDING,
        total,
        shippingAddress,
        billingAddress,
        paymentIntent,
        paymentStatus: 'pending',
        items: {
          create: items.map((item: OrderItem) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            variantInfo: item.variantInfo,
          })),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
