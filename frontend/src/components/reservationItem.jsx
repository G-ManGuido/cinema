import { FaRegTrashAlt } from 'react-icons/fa'
import './comp.css'

const ReservationItem = (props) => {

    const deleteReservation = () => {
        fetch("http://localhost:9000/seats/deleteReservation", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: props.reservation.id })
        })
            .then(res => res.json())
            .then((result) => {
                props.setSeats(result)

                fetch("http://localhost:9000/reservations")
                    .then(res => res.json())
                    .then(result => props.setReservations(result))
            })
    }

    return (
        <li className='reservationItem' key={props.id}>
            <p>Reihe: {props.reservation.line}</p>
            <p>Platz: {props.reservation.seatNumber}</p>
            <p>Preis: {props.reservation.price}</p>
            <div className="deleteReservation" onClick={deleteReservation}>
                <FaRegTrashAlt />
            </div>
        </li>

    );
}

export default ReservationItem;