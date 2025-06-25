# Supabase CRUD Application Setup Guide

This guide will help you set up the full CRUD application with Supabase.

## Prerequisites

1. A Supabase account and project
2. Node.js and npm installed
3. The project dependencies installed (`npm install`)

## Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to be ready
3. Go to Settings > API to get your project URL and anon key

## Step 2: Configure Environment Variables

1. Create a `.env` file in the root directory
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Set Up Database

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the script to create the donations table and sample data

## Step 4: Test the Application

1. Start the development server: `npm run dev`
2. Navigate to the donations page
3. Check the browser console for connection test results
4. You should see the connection status indicator on the page

## Features Implemented

### ✅ Full CRUD Operations
- **Create**: Add new donations with donor name and amount
- **Read**: View all donations with search and filtering
- **Update**: Edit donation details and update status
- **Delete**: Remove donations with confirmation

### ✅ Advanced Features
- **Search**: Search donations by donor name
- **Filtering**: Filter by status (All, Pending, Completed, Failed)
- **Real-time Updates**: Changes reflect immediately in the UI
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Works on desktop and mobile devices

### ✅ Database Features
- **Automatic Timestamps**: Created and updated timestamps
- **Data Validation**: Amount must be positive, status must be valid
- **Indexes**: Optimized for search and filtering performance
- **Row Level Security**: Ready for future authentication

## API Endpoints Used

The application uses these Supabase operations:

- `supabase.from('donations').select('*')` - Get all donations
- `supabase.from('donations').insert([...])` - Create donation
- `supabase.from('donations').update(...).eq('id', id)` - Update donation
- `supabase.from('donations').delete().eq('id', id)` - Delete donation
- `supabase.from('donations').ilike('donor_name', '%search%')` - Search donations

## Troubleshooting

### Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure the donations table exists in your database

### Database Errors
- Run the SQL setup script again
- Check the browser console for specific error messages
- Verify Row Level Security policies are configured correctly

### UI Issues
- Clear browser cache and reload
- Check for JavaScript errors in the console
- Verify all dependencies are installed

## Next Steps

1. **Authentication**: Add user authentication with Supabase Auth
2. **Real-time**: Enable real-time subscriptions for live updates
3. **File Upload**: Add image upload for donation receipts
4. **Export**: Add CSV/PDF export functionality
5. **Analytics**: Add charts and reporting features

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure all environment variables are set correctly 