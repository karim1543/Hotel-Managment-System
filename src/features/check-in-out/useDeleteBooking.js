import { useQueryClient, useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
export function useDeleteBooking() {

    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success("booking successfuly deleted")
            queryClient.invalidateQueries({
                queryKey: ['bookings']
            })
        },
        onError: (err) => toast.error("couldnt delete booking")
    })
    return { isDeleting, deleteBooking }
}