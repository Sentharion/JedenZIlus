"use client"
import { useState, useEffect,useRef } from "react";
import Link from "next/link";
import {etapI,etapII,final} from "../pytania"


function PanelGracza() {
    const [zycie, setZycie] = useState(3);
    const [stanGry,setStanGry] = useState<{etap:string,index:number} | null>(null);
    const [zegar,setZegar] = useState(0);

    const audioZgloszenie = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        const pobierzStanGry = async () => {
           try{
             const res = await fetch("/api/stanGry");
            const data = await res.json();
            if(data.index !== -1) {
                setStanGry(data);
            }
           }catch(error){
            console.error("Błąd pobierania stanu gry:",error);
           }
        }
        pobierzStanGry();
        

        const interval = setInterval(pobierzStanGry, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
       if(typeof window !== "undefined") {
        audioZgloszenie.current = new Audio("/zgloszenie.mp3");
       }
    }, []);
        
        
    const pobierzPytanie = () => {
        if(!stanGry) return null;
        if(stanGry.etap === "Etap I") {
            return etapI[stanGry.index];
        }
        else if(stanGry.etap === "Etap II") {
            return etapII[stanGry.index];
        }
        else if(stanGry.etap === "Finał") {
            return final[stanGry.index];
        }
        return null;
    }

    const aktualnePytanie = pobierzPytanie();

    const zabierzŻycie = () => {
        if(zycie > 0) {
            const noweZycie = zycie - 1;
            setZycie(noweZycie);
            if(noweZycie === 0) {
                setTimeout(() => {
                    alert("Przegrałeś!");
                }, 180);
            }
        }
    }

    const resetZycia = () => {
        setZycie(3);
    }

    const czasStartuRef = useRef<number>(0);
    useEffect(() => {
        czasStartuRef.current = performance.now();
    }, [stanGry]);

    const zglosSie = () => {
        audioZgloszenie.current?.play().catch((error) => {
            console.error("Błąd odtwarzania dźwięku:", error);
        });
        const czasKlikniecia = performance.now();
        const czasReakcji = (czasKlikniecia - czasStartuRef.current) / 1000;
        const sformatowanyCzas = czasReakcji.toFixed(3);

        setZegar(Number(sformatowanyCzas));
        console.log(zegar);
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center py-20 px-4">
            <Link href="\"> <span className="absolute top-4 left-4 sm:top-10 sm:left-10 text-xl font-bold p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-110 duration-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>Powrót</span></Link>
            <h2 className="text-4xl font-bold mb-12">Twoję szanse</h2>
            <div className="flex flex-wrap gap-3">
                <button onClick={zabierzŻycie} className={`w-24 h-24 ${zycie > 0 ? "bg-yellow-500 border-2 border-yellow-600" : "bg-gray-500 border-2 border-gray-600"} rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 duration-300`}></button>
                <button onClick={zabierzŻycie} className={`w-24 h-24 ${zycie > 1 ? "bg-yellow-500 border-2 border-yellow-600" : "bg-gray-500 border-2 border-gray-600"} rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 duration-300`}></button>
                <button onClick={zabierzŻycie} className={`w-24 h-24 ${zycie > 2 ? "bg-yellow-500 border-2 border-yellow-600" : "bg-gray-500 border-2 border-gray-600"} rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 duration-300`}></button>
            </div>
            <button onClick={resetZycia} className="bg-green-600 text-lg font-bold py-2 px-6 rounded-lg flex items-center justify-center cursor-pointer duration-300 hover:bg-green-700 mt-10">
                Resetuj życie
            </button>
            <button onClick={zglosSie} className="bg-red-600 text-lg font-bold py-2 px-6 rounded-lg flex items-center justify-center cursor-pointer duration-300 hover:bg-red-700 mt-10">
                Zgłoś się
            </button>
            <p className="text-2xl font-bold mt-10 bg-black/80 ">{zegar > 0 && `Czas reakcji: ${zegar} s`}</p>
        </div>
    );
}

export default PanelGracza;