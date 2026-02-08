# Authentication & API Setup Guide

This document provides setup instructions for the authentication and API infrastructure.

## Prerequisites

Before running the application, you need to:

1. **Set up a Database** (Choose one):
   - **Supabase** (Recommended): https://supabase.com
   - **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
   - **Local PostgreSQL**: Install PostgreSQL locally

2. **Get your Database URL**:
   - For Supabase: Go to Project Settings > Database > Connection String
   - Copy the connection string (looks like: `postgresql://user:pass@host.supabase.co:5432/postgres`)

## Setup Steps

### 1. Configure Environment Variables

Update `.env.local` with your database URL:

```env
DATABASE_URL="your-database-url-here"
NEXTAUTH_SECRET="generate-a-random-secret-here"
NEXTAUTH_URL="http://localhost:3001"
```

Generate a secret for NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 2. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This creates all the necessary tables in your database.

### 3. Seed the Database

```bash
npx prisma db seed
```

This populates your database with:
- 1 admin user (admin@adirebyregalia.com / ChangeThisPassword123!)
- 6 sample products
- 3 sample orders
- 7 days of analytics data

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the Development Server

If not already running:
```bash
npm run dev
```

## Testing Authentication

1. Navigate to `http://localhost:3001/admin`
2. You'll be redirected to the login page
3. Use the default credentials:
   - **Email**: admin@adirebyregalia.com
   - **Password**: ChangeThisPassword123!
4. After login, you should see the admin dashboard

## API Endpoints

All API endpoints require authentication (except public-facing ones):

### Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Orders
- `GET /api/admin/orders` - List orders (supports ?status= filter)
- `GET /api/admin/orders/[id]` - Get order
- `PUT /api/admin/orders/[id]` - Update order status

### Analytics
- `GET /api/admin/analytics/overview` - Dashboard metrics
- `GET /api/admin/analytics/revenue` - Revenue chart data

## Troubleshooting

### Database Connection Issues

If you see "PrismaClientInitializationError":
1. Check that DATABASE_URL is correct in `.env.local`
2. Ensure your database is running
3. Try running `npx prisma db push` to sync the schema

### Authentication Not Working

1. Ensure NEXTAUTH_SECRET is set
2. Clear cookies and try again
3. Check browser console for errors

### Module Not Found Errors

```bash
npm install
npx prisma generate
```

## Next Steps

Once authentication is working:
1. Change the default admin password in the database
2. Connect the product form to the API
3. Implement image upload with Cloudinary
4. Add more admin users if needed
