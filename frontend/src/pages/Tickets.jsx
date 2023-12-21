import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  const { isLoading, tickets } = useSelector((state) => state.ticket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="tickets-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
          <div>
            {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tickets;
