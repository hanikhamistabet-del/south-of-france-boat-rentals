import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const { boatId } = await request.json();

    if (!boatId) {
      return NextResponse.json(
        { error: "Boat ID required" },
        { status: 400 }
      );
    }

    await supabaseAdmin
      .from("boat_images")
      .delete()
      .eq("boat_id", boatId);

    const { error } = await supabaseAdmin
      .from("boats")
      .delete()
      .eq("id", boatId);

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}