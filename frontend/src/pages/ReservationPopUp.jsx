import { useState, useEffect } from 'react';
import validator from 'validator';

import '../components/comp.css'

const ReservationPopUp = (props) => {

    const [besteller, setBesteller] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [order, setOrder] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberOfSeats, setNumberOfSeats] = useState(0);

    useEffect(() => {
        let tempValue = 0;
        let tempNumberOfSeats = 0;

        props.reservations.map((reservation) => {
            tempValue += reservation.price
            tempNumberOfSeats++
        })

        setTotalPrice(tempValue);
        setNumberOfSeats(tempNumberOfSeats);

    }, []);

    const sendReservation = (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            setEmailError('Email-Adresse ist nicht korrekt - Bitte überprüfen...')
            return
        }
        fetch("http://localhost:9000/completeReservation", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ besteller, email })

        })
            .then((res) => {
                fetch("http://localhost:9000/seats/clearReservationsArray", { method: 'DELETE' })
                res.json()
            })

        props.setReservations([])
        props.handleClose()
    }

    // 

    const isOrderChecked = (e) => {
        e.checked ? setOrder(true) : setOrder(false)
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <h1>Reservierung abschliessen</h1>
                <p>Um ihre Reservierung abschliessen zu können benötigen wir noch ein paar Angaben
                    von Ihnen. Im Anschluss senden wir Ihnen den Reservierungsbeleg an die angebenen Email zu. Diese Email gilt somit als Eintrittskarte.
                </p>
                <br />
                <p>Anzahl reservierter Sitzeplätze: {numberOfSeats}</p>
                <p>Gesamtpreis: {totalPrice} €</p>

                <form>
                    <div className='input-area'>
                        <label htmlFor="besteller">Bitte geben Sie ihren Namen ein:</label>
                        <input type="text" id='besteller' value={besteller} onChange={(e) => setBesteller(e.target.value)} />
                        <label htmlFor="email">Bitte geben Sie ihre Email ein:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />


                        <p>{emailError}</p>
                    </div>

                    <div className='check-area'>
                        <input type="checkbox" name="order" id="order" onClick={(e) => isOrderChecked(e.target)} />
                        <label htmlFor="order"> Ja, ich möchte Kostenpflichtig reservieren</label>
                    </div>

                    <button className="orderNow" disabled={!order} onClick={sendReservation}>Reservierung abschicken</button>
                </form>
                {props.content}
            </div>
        </div>
    );
}

export default ReservationPopUp;