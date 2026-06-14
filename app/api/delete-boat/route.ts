import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { boatId } = await request.json();

    if (!boatId) {
      return NextResponse.json(
        { error: "Boat ID is required" },
        { status: 400 }
      );
    }

    const { error: imageError } = await supabase
      .from("boat_images")
      .delete()
      .eq("boat_id", boatId);

    if (imageError) {
      console.error("Image delete error:", imageError);

      return NextResponse.json(
        { error: imageError.message },
        { status: 500 }
      );
    }

    const { data, error: boatError } = await supabase
      .from("boats")
      .delete()
      .eq("id", boatId)
      .select();

    if (boatError) {
      console.error("Boat delete error:", boatError);

      return NextResponse.json(
        { error: boatError.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          error:
            "No boat was deleted. Check RLS policies and ownership.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedBoat: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}