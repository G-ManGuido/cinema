const fs = require("fs")
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const { readData, writeData } = require("./data-functions");
const { sendMail } = require("./mail-functions");
const { reservationMessage } = require("./mail-messages")

let reservationArray = [];

const port = 9000;
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
const apiKey = process.env.CINEMA_API_KEY

// -------------------- middleware ----------------------
app.use((req, _, next) => {
    console.log("new request | ", req.method, req.url);
    next();
})

// -------------------- GET ----------------------
app.get("/seats", (_, res) => {
    readData(__dirname + '/data/seats.json')
        .then(result => res.json(result))
})

app.get("/reservations", (_, res) => {
    console.log("Array Inhalt in .get", reservationArray);
    res.json(reservationArray)
})

// -------------------- POST ----------------------
app.post("/completeReservation", (req, res) => {
    const besteller = req.body.besteller
    const mailAddress = req.body.email

    sendMail({
        to: mailAddress,
        subject: "Reservierungsbestätigung - VCP",
        message: reservationMessage(besteller)
    }).then(() => {
        reservationArray = [];
    }).catch((err) => {
        res.status(400).json({ error: "Error during reservation - Please contact the support divison" })
    })
})

// -------------------- PUT ----------------------
app.put("/seats/updateReservation", (req, res) => {
    const targetId = req.body.id
    const newCompleted = req.body.isBooked
    let newReservation = {};

    readData(__dirname + '/data/seats.json')
        .then(seats => {
            const updatedSeatsArray = // neues Todo Array mit den geänderten Todo anlegen
                seats.map((seat) => {
                    if (seat.id === targetId) {
                        // das gewünschte todo objekte im array finden und überschreiben
                        newReservation = {
                            id: seat.id,
                            line: seat.reihe,
                            seatNumber: seat.seatNumber,
                            price: seat.price
                        }

                        return { ...seat, isBooked: newCompleted }
                    } else {
                        // alle anderen todos returnen so wie sie sind... (aka keine Änderung)!
                        return seat
                    }
                })
            return updatedSeatsArray // an das nächste then weitergeben
        })
        .then((updatedSeatsArray) => writeData(updatedSeatsArray, __dirname + "/data/seats.json")) // schritt 3 - alles wieder in die todos.json datei speichern
        .then((result) => {
            reservationArray.push(newReservation)
            res.json(result)
        })
        .catch(_ => res.status(500).json({ err: "Unknown error while reading or writing todos." }))
})


app.put("/seats/deleteReservation", (req, res) => {
    const targetId = req.body.id;

    readData(__dirname + '/data/seats.json')
        .then(seats => {
            const updatedSeatsArray =
                seats.map((seat) => {
                    if (seat.id === targetId) {
                        return { ...seat, isBooked: false }
                    } else {
                        return seat
                    }
                })
            return updatedSeatsArray // an das nächste then weitergeben
        })
        .then((updatedSeatsArray) => writeData(updatedSeatsArray, __dirname + "/data/seats.json"))
        .then(result => {
            console.log(result);
            reservationArray = reservationArray.filter(reservationArray => reservationArray.id !== targetId)
            res.json(result)
        })
        .catch(_ => res.status(500).json({ err: "Unknown error while reading or writing todos." }))
})


app.put("/seats/clearAllReservations", (_, res) => {

    readData(__dirname + '/data/seats.json')
        .then(seats => {
            const tempSeatArray =
                seats.map((seat) => {
                    if (seat.isBooked === true) {
                        return { ...seat, isBooked: false }
                    } else {
                        return seat
                    }
                })
            return tempSeatArray // an das nächste then weitergeben
        })
        .then((updatedSeatsArray) => writeData(updatedSeatsArray, __dirname + "/data/seats.json"))
        .then((result) => {
            reservationArray = []
            res.json(result)
        })
        .catch(_ => res.status(500).json({ err: "Unknown error while reading or writing todos." }))
})


// -------------------- DELETE ----------------------
app.delete("/seats/clearReservationsArray", (_, res) => {
    reservationArray = []
    res.end()
})



app.listen(port, () => console.log("server listen on Port:", port));