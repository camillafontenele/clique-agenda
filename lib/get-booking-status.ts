export type BookingStatus = "scheduled" | "finished" | "cancelled";

interface GetBookingStatusInput {
  date: Date;
  cancelledAt: Date | null;
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  scheduled: "Agendado",
  finished: "Finalizado",
  cancelled: "Cancelado",
};

export const getBookingStatus = ({
  date,
  cancelledAt,
}: GetBookingStatusInput) => {
  const status: BookingStatus = cancelledAt
    ? "cancelled"
    : date.getTime() >= new Date().getTime()
      ? "scheduled"
      : "finished";

  return {
    status,
    label: STATUS_LABELS[status],
  };
};
