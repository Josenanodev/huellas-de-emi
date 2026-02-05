import type { APIRoute } from 'astro';

interface ContactRequestBody {
  name: string;
  email: string;
  phone: string;
  dogId?: string;
  message: string;
}

// Submit contact form
export const POST: APIRoute = async (context) => {
  try {
    const body: ContactRequestBody = await context.request.json();
    const { name, email, phone, dogId, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // TODO: Implement email notifications or database storage
    // In a production application, you would:
    // 1. Save the contact submission to a database
    // 2. Send an email notification to the shelter staff
    // 3. Send a confirmation email to the user
    console.log('Contact form submission:', { name, email, phone, dogId, message });

    return new Response(
      JSON.stringify({
        message: 'Contact form submitted successfully',
        data: { name, email, phone, dogId, message },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
