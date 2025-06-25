# TalentShore Donation Management System

A modern, responsive web application for managing donations with status updates and a clean, intuitive interface.

## 🚀 Features

- **Donation Management**: View and manage donation records
- **Status Tracking**: Real-time status updates (Pending, Completed, Failed)
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant status changes with Supabase backend
- **Clean Interface**: Shadcn/ui components for consistent design

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account and project

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the SQL setup script from `supabase-setup.sql` in your Supabase SQL editor
3. This will create the necessary tables and functions for the donation system

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── donations/
│   │   ├── DonationList.tsx      # Main donation table component
│   │   └── AddDonationForm.tsx   # Form for adding new donations
│   ├── ui/                       # Shadcn/ui components
│   └── Navigation.tsx            # Navigation component
├── pages/
│   ├── donations/
│   │   └── DonationsPage.tsx     # Main donations page
│   └── home/
│       ├── HomePage.tsx          # Landing page
│       └── LoginPage.tsx         # Authentication page
├── services/
│   ├── donationService.ts        # Donation API calls
│   └── supabaseService.ts        # Supabase configuration
├── types/
│   └── donation.ts               # TypeScript interfaces
└── stores/
    └── data/
        └── AuthStore.ts          # Authentication state management
```

## 🎯 Usage

### Viewing Donations

1. Navigate to the donations page
2. View all donations in a clean, organized table
3. See donor information, amounts, dates, and current status

### Updating Donation Status

1. Locate the donation in the table
2. Use the status dropdown in the Status column
3. Select the new status (Pending, Completed, or Failed)
4. Changes are saved automatically

### Adding New Donations

1. Use the "Add Donation" form
2. Enter donor name and amount
3. Submit to create a new donation record

## 🎨 UI Components

The project uses Shadcn/ui components for a consistent and modern design:

- **Table**: Clean, responsive table for displaying donations
- **Select**: Dropdown for status updates
- **Button**: Consistent button styling
- **Dialog**: Modal dialogs for forms and confirmations
- **Input**: Form input fields
- **Label**: Form labels

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

## 📝 Database Schema

The application uses the following main table:

```sql
donations (
  id UUID PRIMARY KEY,
  donor_name TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Supabase documentation for backend questions
- Review the Shadcn/ui documentation for component questions

---

Built with ❤️ using React, TypeScript, and Supabase
