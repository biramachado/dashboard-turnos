import React from "react";
import RelogioTurno from "../components/RelogioTurno";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">Painel de Turnos</h1>
      <RelogioTurno />
    </div>
  );
}
