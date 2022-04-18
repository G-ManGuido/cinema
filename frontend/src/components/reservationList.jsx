import ReservationItem from './reservationItem';
import './comp.css'

const ReservationList = (props) => {

    return (
        <div className="reservationList"  >
            <ul className='reservationList-container'>
                {props.reservations.map(reservation =>
                    <ReservationItem reservation={reservation} setReservations={props.setReservations}
                        key={reservation.id} setSeats={props.setSeats} />)}
            </ul>

        </div>
    );
}

export default ReservationList;