
import './comp.css'

const Seat = (props) => {

    const updateReservation = () => {
        fetch("http://localhost:9000/seats/updateReservation", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: props.seat.id, isBooked: !props.seat.isBooked })
        }).then(res => res.json())
            .then((result) => {
                props.setSeats(result)

                fetch("http://localhost:9000/reservations")
                    .then(res => res.json())
                    .then(result => props.setReservations(result))
            })
    }

    return (
        <li key={props.seat.id}>

            {props.seat.isBooked === true &&
                <div className="seatOccupied" >
                    {props.seat.seatNumber}
                </div>
            }

            {props.seat.isBooked !== true &&
                <div
                    onClick={updateReservation}

                    className={props.seat.isBooked ? "seatOccupied" :
                        props.seat.reihe >= 3 ? "seatFreeLowlevel" : "seatFreeUpperlevel"}
                >
                    {props.seat.seatNumber}
                </div>
            }

        </li >
    );
}

export default Seat;