import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const res = await api.get(`/campers/${id}`);
    
    return NextResponse.json(res.data, { 
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('API route error:', error);
    
    if (isAxiosError(error)) {
      return NextResponse.json(
        { 
          error: error.message, 
          details: error.response?.data 
        },
        { 
          status: error.response?.status ?? 500
        }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}