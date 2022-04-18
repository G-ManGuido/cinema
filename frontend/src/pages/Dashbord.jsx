import { useState, useEffect } from "react";
import '../components/comp.css'

const Dashboard = () => {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9000/seats")
            .then((res) => res.json())
            .then((result) => setSeats(result))
    }, []);

    const getSales = () => {
        let sale = 0;
        seats.map((seat) => {
            if (seat.isBooked === true) {
                sale += seat.price
            }
        })
        return sale;
    }

    const getFreeSeats = () => {
        const freeSeats = seats.filter(seat => seat.isBooked === false)
        return freeSeats.length;
    }

    const reset = () => {
        fetch("http://localhost:9000/seats/clearAllReservations", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())
            .then(result => setSeats(result))
    }

    return (
        <div id="dashboard">
            <header className="header">
                <h1>Willkommen Kinobesitzer</h1>
            </header>

            <main>
                <div className="dashboard-container">
                    <div className="dashboard-item">
                        <h3>Freie Plätze</h3>
                        <p>{getFreeSeats()}</p>
                    </div>
                    <div className="dashboard-item">
                        <h3>Umsatz</h3>
                        <p>{getSales()} €</p>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={reset}>RESET</button>
                </div>


            </main >

        </div >
    );
}

export default Dashboard;