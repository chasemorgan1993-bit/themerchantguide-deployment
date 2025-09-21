import { NextRequest, NextResponse } from 'next/server';

// For now, we'll use a simple approach without the Mailchimp package
// to avoid any compatibility issues with Next.js App Router

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Mailchimp API details - you'll add these to your .env.local
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
      // For development - just log to console
      console.log(`📧 [${source}] Email signup:`, email);
      return NextResponse.json({
        success: true,
        message: 'Thanks for subscribing! (Development mode)',
      });
    }

    // Mailchimp API URL
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    // Prepare the data
    const data = {
      email_address: email,
      status: 'subscribed',
      tags: [source], // Tag subscribers based on where they signed up (blog/podcast)
      merge_fields: {
        SOURCE: source, // Track which page they came from
      },
    };

    // Make the API call to Mailchimp
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed!',
      });
    } else {
      // Handle Mailchimp errors
      if (result.title === 'Member Exists') {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed! Thanks for your interest.",
        });
      }

      console.error('Mailchimp error:', result);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}