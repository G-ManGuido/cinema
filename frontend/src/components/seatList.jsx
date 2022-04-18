import Seat from './seat'
const SeatList = (props) => {

    return (
        <div>
            <ul>
                {props.seats.map(seat => <Seat seat={seat} setSeats={props.setSeats} reservations={props.reservations} setReservations={props.setReservations} key={seat.id} />)}
            </ul>
        </div>
    );
}

export default SeatList;