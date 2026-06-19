"use client"
import { final } from "../pytania";
import { useState, useRef } from "react";
import Link from "next/link";


function Etap2() {
    const audioGood = useRef(new Audio("/dobrze.mp3"));
    const audioBad = useRef(new Audio("/zle.mp3"));

    const [losowaLiczba, setLosowaLiczba] = useState<number | null>(null);
    const [iloscPytan, setIloscPytan] = useState(40);
    const [koniec, setKoniec] = useState(false);

    const drawQuestion = () => {
        if (koniec) return;
        if (iloscPytan === 0) {
            setKoniec(true);
            alert("Wylosowano wszystkie pytania!");
            return;
        }
        setLosowaLiczba(Math.floor(Math.random() * final.length));
        setIloscPytan(iloscPytan - 1);
    }
    const handleGood = () => {
        audioGood.current.play();
    }

    const handleBad = () => {
        audioBad.current.play();
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center py-20 px-4">
            <Link href="\"> <span className="absolute top-4 left-4 sm:top-10 sm:left-10 text-xl font-bold p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-110 duration-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>Powrót</span></Link>
            <h1 className="text-4xl sm:text-6xl font-bold mb-3 text-transform: uppercase">
                Finał
            </h1>
            {koniec ? (
                <p className="mb-5 p-2 bg-red-800 border-2 border-black rounded-lg">Wylosowano wszystkie pytania!</p>
            ) : (
                <p className="mb-5 p-2 bg-black/80 border-2 border-black rounded-lg">Ilość pytań: {iloscPytan}</p>
            )}
            <button onClick={drawQuestion} className="bg-gradient-to-br from-[#ebd197] via-[#b48811] to-[#a2790d] text-lg font-bold p-3 border-2 border-black rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 duration-300 hover:rotate-3">Losuj pytanie</button>
            {losowaLiczba !== null ? (
                <>
                    <div className="flex flex-col w-[95%] sm:w-auto max-w-4xl justify-center items-center bg-black/80 p-6 sm:p-8 border border-black rounded-lg mt-6 text-center">
                        <p className="text-xl font-medium mb-6 text-blue-400">{final[losowaLiczba].kategoria}</p>
                        <h1 className="text-xl sm:text-3xl font-bold text-center mb-6">{final[losowaLiczba].pytanie}</h1>
                        <p className="text-lg text-yellow-300">Odpowiedź: {final[losowaLiczba].odpowiedź}</p>
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button onClick={handleGood} className="bg-green-600 text-lg font-bold py-2 px-6 rounded-lg flex items-center justify-center cursor-pointer duration-300 hover:bg-green-700">Dobrze</button>
                        <button onClick={handleBad} className="bg-red-600 text-lg font-bold py-2 px-6 rounded-lg flex items-center justify-center cursor-pointer duration-300 hover:bg-red-700">Źle</button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col w-[95%] sm:w-auto max-w-4xl justify-center items-center bg-black/80 p-6 sm:p-8 border border-black rounded-lg mt-12 text-center">
                    <p className="text-xl font-medium">Kliknij przycisk, aby wylosować pytanie</p>
                </div>
            )}
        </div>
    );
}

export default Etap2;