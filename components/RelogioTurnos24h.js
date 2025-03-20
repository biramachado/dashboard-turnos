import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const turnos = [
  { name: "Marcelo", schedule: { "Segunda": [[8, 12], [13, 16.5]], "Terça": [[8, 12], [13, 16.5]], "Quarta": [[8, 12], [13, 16.5]], "Quinta": [[8, 12], [13, 16.5]], "Sexta": [[8, 12], [13, 16.5]], "Domingo": [[8, 12], [13, 15.5]] }, color: "#ff9999" },
  { name: "Marcela", schedule: { "Segunda": [[8, 13], [15, 18]], "Terça": [[8, 13], [15, 18]], "Quarta": [[8, 13], [15, 18]], "Quinta": [[8, 13], [15, 18]], "Sexta": [[8, 13], [15, 18]], "Domingo": [[8, 12]] }, color: "#99ccff" },
  { name: "Nathan", schedule: { "Segunda": [[8, 13], [18, 22]], "Terça": [[8, 13], [18, 22]], "Quarta": [[8, 13], [18, 22]], "Quinta": [[8, 13], [18, 22]], "Sexta": [[8, 12.5]], "Sábado": [[18.5, 22]] }, color: "#99ff99" },
  { name: "Shirley", schedule: { "Segunda": [[14, 22]], "Terça": [[14, 22]], "Quarta": [[14, 22]], "Quinta": [[14, 22]], "Sexta": [[14, 18]], "Domingo": [[14, 22]] }, color: "#ffcc66" },
  { name: "Ubiran", schedule: { "Segunda": [[8, 12], [13, 18], [19, 21]], "Terça": [[8, 12], [13, 18], [19, 21]], "Quarta": [[8, 12], [13, 18], [19, 21]], "Quinta": [[8, 12], [13, 18], [19, 21]], "Sexta": [[8, 12], [13, 18]], "Domingo": [[8, 12], [13, 18], [19, 21]] }, color: "#ff6666" }
];

const RelogioTurno = () => {
  const [horaAtual, setHoraAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHoraAtual(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hora = horaAtual.getHours() + horaAtual.getMinutes() / 60;
  const diaSemana = format(horaAtual, "EEEE", { locale: ptBR }).toLowerCase();

  const turnoAtual = turnos.find(({ schedule }) =>
    schedule[diaSemana]?.some(([start, end]) => start <= hora && hora < end)
  );

  const dados = turnos.flatMap(({ name, schedule, color }) =>
    (schedule[diaSemana] || []).map(([start, end]) => ({ name, value: end - start, color }))
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Relógio de Turnos</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={dados}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          dataKey="value"
          startAngle={-90}
          endAngle={270}
        >
          {dados.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <h3 className="mt-4 text-lg font-semibold">
        Agora: {format(horaAtual, "HH:mm")} - Turno: {turnoAtual?.name || "Nenhum"}
      </h3>
    </div>
  );
};

export default RelogioTurno;
