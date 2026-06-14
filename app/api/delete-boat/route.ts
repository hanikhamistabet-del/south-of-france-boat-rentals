import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  try {
    const { boatId } =
      await request.json();

    await supabase
      .from("boat_images")
      .delete()
      .eq("boat_id", boatId);

    const { error } = await supabase
      .from("boats")
      .delete()
      .eq("id", boatId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}