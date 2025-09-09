import { NextResponse } from "next/server";
import { getListings } from "@/components/host/actions";
import { Listing } from "@/types/listing";

export async function GET() {
	try {
		const listings = await getListings({ publishedOnly: true });
		return NextResponse.json(listings as Listing[]);
	} catch (error) {
		console.error("Error fetching published listings:", error);
		return NextResponse.json([], { status: 500 });
	}
}