import type { NextApiRequest, NextApiResponse } from "next";

interface AddressItem {
    Id: string;
    Text: string;
    Highlight: string;
    Cursor: string;
    Description: string;
}

// API Response
interface CanadaPostResponse {
    Items: AddressItem[];
}

// Error Response
interface ErrorResponse {
    error: string;
}

// Security headers
const setSecurityHeaders = (res: NextApiResponse) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none';");
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AddressItem | ErrorResponse>
) {
    setSecurityHeaders(res);

    const { zip } = req.query;

    if (!zip || typeof zip !== 'string') {
        return res.status(400).json({ error: 'ZIP code is required' });
    }

    const apiKey = process.env.CANADA_POST_API_KEY;
    const url = `https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3.ws?Key=${apiKey}&SearchTerm=${encodeURIComponent(zip)}&Country=CA`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from Canada Post');
        }

        const data: CanadaPostResponse = await response.json();

        if (data.Items.length === 0) {
            return res.status(404).json({ error: 'No address found for the provided postal code.' });
        }

        // Return the first matching address
        res.status(200).json(data.Items[0]);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}
