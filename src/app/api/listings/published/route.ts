import { NextResponse } from "next/server";
import { getListings } from "@/components/host/actions";
import { Listing } from "@/types/listing";

export async function GET() {
	try {
		const listings = await getListings({ publishedOnly: true });

		// Ensure we always return an array
		const data = Array.isArray(listings) ? listings : [];

		return NextResponse.json(data as Listing[], {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error("Error fetching published listings:", error);

		// Always return valid JSON, even on error
		return NextResponse.json(
			{
				error: "Failed to fetch listings",
				data: []
			},
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
}