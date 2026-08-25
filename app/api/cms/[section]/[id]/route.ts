import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const tableMap = {
  hero: "hero_banner",
  deals: "travel_exclusives",
  destinations: "popular_destinations",
  promos: "promo_banners",
  testimonials: "testimonials",
  insights: "latest_insights",
} as const;

type Section = keyof typeof tableMap;

function getTable(section: string) {
  if (!(section in tableMap)) {
    return null;
  }

  return tableMap[section as Section];
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(
  data: unknown,
  status = 200
) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders,
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      section: string;
      id: string;
    }>;
  }
) {
  const { section, id } = await context.params;

  const table = getTable(section);

  if (!table) {
    return jsonResponse(
      {
        success: false,
        error: "Invalid CMS section",
      },
      400
    );
  }

  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from(table)
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return jsonResponse(
        {
          success: false,
          error: error.message,
        },
        500
      );
    }

    return jsonResponse({
      success: true,
      data,
    });
  } catch {
    return jsonResponse(
      {
        success: false,
        error: "Invalid request body",
      },
      400
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      section: string;
      id: string;
    }>;
  }
) {
  const { section, id } = await context.params;

  const table = getTable(section);

  if (!table) {
    return jsonResponse(
      {
        success: false,
        error: "Invalid CMS section",
      },
      400
    );
  }

  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);

  if (error) {
    return jsonResponse(
      {
        success: false,
        error: error.message,
      },
      500
    );
  }

  return jsonResponse({
    success: true,
    message: "Deleted successfully",
  });
}