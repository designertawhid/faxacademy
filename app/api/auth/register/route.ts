import { NextResponse } from 'next/server';
import { saveUserToAPI } from '@/lib/user-backup';

// Remove the dynamic export since we're using static export
// export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Save user data to external API
    const result = await saveUserToAPI({
      name,
      email,
      password,
      date: new Date().toISOString(),
    });
    
    if (!result.success) {
      console.error('Failed to save user to API:', result.error);
      // Continue with registration even if the API backup fails
      // This ensures users can still register even if the backup fails
    }
    
    // In a real application, you would also save the user to your database here
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully',
        user: { name, email }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
