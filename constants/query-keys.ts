const querykeys = {
  getDateAvailableTimeSlots: (serviceId: string, date?: Date) => [
    "date-available-time-slots",
    serviceId,
    date?.toISOString(),
  ],
};

export default querykeys;
