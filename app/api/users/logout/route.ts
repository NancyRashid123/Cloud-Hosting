
import {  NextResponse } from "next/server";
import {cookies} from "next/headers"

/**
 * @method Get
 * @route /api/users/logout
 * @description logout
 * @access public
 */

export async function GET() {
    try {
        (await cookies()).delete("tokenCookie");
        return NextResponse.json({message:"logout successfully"},{status:200});
    } catch (error) {
        return NextResponse.json({message:error},{status:500});
    }
}