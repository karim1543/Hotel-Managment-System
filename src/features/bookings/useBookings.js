import { useQuery } from "@tanstack/react-query";
import { GetBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


export function useBookings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const { isLoading,
        data: { data: bookings, count: count } = {},
        error } = useQuery({
            queryKey: ['bookings', page],
            queryFn: () => GetBookings({ page }),
        })
    return { isLoading, bookings, error, count }
} 