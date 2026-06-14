import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {
  try {
    const {
      ownerEmail,
      boatName,
      customerName,
      customerEmail,
      customerPhone,
      message,
    } = await req.json();

    const { data, error } =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ownerEmail,
        subject: `New Booking Request for ${boatName}`,
        html: `
          <h2>New Booking Request</h2>

          <p>
            <strong>Boat:</strong>
            ${boatName}
          </p>

          <p>
            <strong>Name:</strong>
            ${customerName}
          </p>

          <p>
            <strong>Email:</strong>
            ${customerEmail}
          </p>

          <p>
            <strong>Phone:</strong>
            ${customerPhone}
          </p>

          <p>
            <strong>Message:</strong>
            ${message}
          </p>
        `,
      });

    if (error) {
      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}