import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";

export function useBooking() {
    const { bookingId, setBookingId } = useParams()
    const { isLoading, data: booking, error } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false
    })
    return { isLoading, booking, error, }
}