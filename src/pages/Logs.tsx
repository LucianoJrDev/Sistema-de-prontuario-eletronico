import { Shield, Eye, Edit, FileText, Download } from "lucide-react";

const logs = [
  { id: 1, user: "Dr. Ricardo Mendes", action: "Visualizou prontuário", target: "Maria Silva", timestamp: "06/04/2026 08:15", icon: Eye },
  { id: 2, user: "Admin", action: "Editou cadastro", target: "João Santos", timestamp: "06/04/2026 07:45", icon: Edit },
  { id: 3, user: "Dra. Juliana Alves", action: "Adicionou registro", target: "Ana Oliveira (Prontuário)", timestamp: "05/04/2026 16:30", icon: FileText },
  { id: 4, user: "Dr. Ricardo Mendes", action: "Baixou exame", target: "Carlos Souza - Hemograma", timestamp: "05/04/2026 14:20", icon: Download },
  { id: 5, user: "Admin", action: "Visualizou prontuário", target: "Lucia Ferreira", timestamp: "05/04/2026 11:00", icon: Eye },
  { id: 6, user: "Dra. Patrícia Nunes", action: "Adicionou registro", target: "Pedro Lima (Prontuário)", timestamp: "05/04/2026 10:15", icon: FileText },
  { id: 7, user: "Admin", action: "Editou cadastro", target: "Fernanda Costa", timestamp: "04/04/2026 17:30", icon: Edit },
  { id: 8, user: "Dr. Fernando Lima", action: "Visualizou prontuário", target: "Carlos Souza", timestamp: "04/04/2026 09:00", icon: Eye },
];

const actionColors: Record<string, string> = {
  "Visualizou prontuário": "bg-info/10 text-info",
  "Editou cadastro": "bg-warning/10 text-warning",
  "Adicionou registro": "bg-success/10 text-success",
  "Baixou exame": "bg-primary/10 text-primary",
};

export default function Logs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logs de Acesso</h1>
          <p className="text-sm text-muted-foreground">Registro de todas as ações realizadas no sistema (LGPD)</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${actionColors[log.action] || "bg-muted text-muted-foreground"}`}>
              <log.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{log.user}</span>{" "}
                <span className="text-muted-foreground">{log.action.toLowerCase()}</span>{" "}
                <span className="font-medium">{log.target}</span>
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
