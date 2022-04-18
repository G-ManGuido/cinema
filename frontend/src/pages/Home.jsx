import { useState, useEffect } from 'react';
import SeatList from '../components/seatList';
import ReservationList from '../components/reservationList';
import ReservationPopUp from './ReservationPopUp';
import '../components/comp.css'

function Home() {
    const [seats, setSeats] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:9000/seats")
            .then((res) => res.json())
            .then((result) => setSeats(result))

        fetch("http://localhost:9000/seats/clearReservationsArray", { method: 'DELETE' })

    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className="App">

            <div id="seat">
                <header className="header">
                    <h1>Willkommen im Kino der Zukunft</h1>
                </header>

                <main className='container'>
                    <div >
                        <SeatList seats={seats} setSeats={setSeats} reservations={reservations} setReservations={setReservations} />
                    </div>
                    <div className="leinwand">Leinwand</div>
                </main>

                <footer>
                    <div id="reservations-container">
                        <h3>Ihre Reservierungen:</h3>
                        <ReservationList reservations={reservations} setReservations={setReservations} setSeats={setSeats} setIsOpen={setIsOpen} />
                    </div>

                    <button className="reservation-order" disabled={reservations < 1} onClick={togglePopup}>jetzt Kostenpflichtig reservieren</button>
                </footer>
            </div>

            {isOpen && <ReservationPopUp reservations={reservations} setReservations={setReservations} handleClose={togglePopup} />}
        </div>
    );
}

export default Home;
