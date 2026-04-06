import { useState } from "react";
import { Plus, Clock, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmado" | "Pendente" | "Cancelado";
}

const initialAppointments: Appointment[] = [
  { id: 1, patient: "Maria Silva", doctor: "Dr. Ricardo Mendes", date: "06/04/2026", time: "08:00", type: "Consulta", status: "Confirmado" },
  { id: 2, patient: "João Santos", doctor: "Dra. Juliana Alves", date: "06/04/2026", time: "09:30", type: "Retorno", status: "Confirmado" },
  { id: 3, patient: "Ana Oliveira", doctor: "Dr. Fernando Lima", date: "06/04/2026", time: "10:00", type: "Exame", status: "Pendente" },
  { id: 4, patient: "Carlos Souza", doctor: "Dra. Patrícia Nunes", date: "07/04/2026", time: "08:00", type: "Consulta", status: "Confirmado" },
  { id: 5, patient: "Lucia Ferreira", doctor: "Dr. Ricardo Mendes", date: "07/04/2026", time: "14:00", type: "Consulta", status: "Cancelado" },
  { id: 6, patient: "Pedro Lima", doctor: "Dr. Marcos Ribeiro", date: "07/04/2026", time: "15:30", type: "Retorno", status: "Pendente" },
];

const statusStyles: Record<string, string> = {
  Confirmado: "bg-success/10 text-success",
  Pendente: "bg-warning/10 text-warning",
  Cancelado: "bg-destructive/10 text-destructive",
};

export default function Agendamentos() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const appt: Appointment = {
      id: appointments.length + 1,
      patient: fd.get("patient") as string,
      doctor: fd.get("doctor") as string,
      date: fd.get("date") as string,
      time: fd.get("time") as string,
      type: fd.get("type") as string,
      status: "Pendente",
    };
    setAppointments([appt, ...appointments]);
    setDialogOpen(false);
    toast.success("Agendamento criado com sucesso!");
  };

  const grouped = appointments.reduce<Record<string, Appointment[]>>((acc, a) => {
    (acc[a.date] = acc[a.date] || []).push(a);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-sm text-muted-foreground">{appointments.length} agendamentos</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Novo Agendamento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Agendar Consulta</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div><Label htmlFor="patient">Paciente</Label><Input id="patient" name="patient" required /></div>
              <div><Label htmlFor="doctor">Médico</Label><Input id="doctor" name="doctor" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="date">Data</Label><Input id="date" name="date" placeholder="DD/MM/AAAA" required /></div>
                <div><Label htmlFor="time">Horário</Label><Input id="time" name="time" placeholder="HH:MM" required /></div>
              </div>
              <div><Label htmlFor="type">Tipo</Label><Input id="type" name="type" placeholder="Consulta, Retorno, Exame" required /></div>
              <Button type="submit" className="w-full">Agendar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([date, appts]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">{date}</h2>
              <span className="text-xs text-muted-foreground">({appts.length} consultas)</span>
            </div>
            <div className="space-y-2">
              {appts.sort((a, b) => a.time.localeCompare(b.time)).map((a) => (
                <div key={a.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex flex-col items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-bold text-foreground">{a.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.patient}</p>
                      <p className="text-xs text-muted-foreground">{a.doctor} • {a.type}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[a.status]}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
