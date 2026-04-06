import { Users, CalendarDays, FileText, Stethoscope, Clock, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";

const recentPatients = [
  { name: "Maria Silva", age: 45, lastVisit: "05/04/2026", status: "Ativo" },
  { name: "João Santos", age: 62, lastVisit: "04/04/2026", status: "Ativo" },
  { name: "Ana Oliveira", age: 33, lastVisit: "03/04/2026", status: "Retorno" },
  { name: "Carlos Souza", age: 57, lastVisit: "02/04/2026", status: "Novo" },
  { name: "Lucia Ferreira", age: 28, lastVisit: "01/04/2026", status: "Ativo" },
];

const upcomingAppointments = [
  { patient: "Pedro Lima", doctor: "Dr. Ricardo Mendes", time: "08:00", type: "Consulta" },
  { patient: "Fernanda Costa", doctor: "Dra. Juliana Alves", time: "09:30", type: "Retorno" },
  { patient: "Roberto Dias", doctor: "Dr. Ricardo Mendes", time: "10:00", type: "Exame" },
  { patient: "Camila Rocha", doctor: "Dra. Patrícia Nunes", time: "11:00", type: "Consulta" },
];

const statusColors: Record<string, string> = {
  Ativo: "bg-success/10 text-success",
  Retorno: "bg-warning/10 text-warning",
  Novo: "bg-primary/10 text-primary",
  Consulta: "bg-primary/10 text-primary",
  Exame: "bg-accent/10 text-accent",
};

export default function Index() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Visão geral do sistema — {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pacientes" value={1247} icon={Users} trend="+12 esta semana" variant="primary" />
        <StatCard title="Consultas Hoje" value={18} icon={CalendarDays} variant="success" />
        <StatCard title="Médicos Ativos" value={24} icon={Stethoscope} variant="default" />
        <StatCard title="Prontuários" value={3842} icon={FileText} variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Pacientes Recentes</h2>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {recentPatients.map((p) => (
              <div key={p.name} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.age} anos • {p.lastVisit}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[p.status] || "bg-muted text-muted-foreground"}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Consultas de Hoje</h2>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {upcomingAppointments.map((a) => (
              <div key={a.patient + a.time} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground text-xs font-bold">
                    {a.time}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.patient}</p>
                    <p className="text-xs text-muted-foreground">{a.doctor}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[a.type] || "bg-muted text-muted-foreground"}`}>
                  {a.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
