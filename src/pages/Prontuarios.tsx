import { Search, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface MedicalRecord {
  id: number;
  patient: string;
  lastUpdate: string;
  entries: number;
  conditions: string[];
  doctor: string;
}

const records: MedicalRecord[] = [
  { id: 1, patient: "Maria Silva", lastUpdate: "05/04/2026", entries: 12, conditions: ["Hipertensão", "Diabetes Tipo 2"], doctor: "Dr. Ricardo Mendes" },
  { id: 2, patient: "João Santos", lastUpdate: "04/04/2026", entries: 8, conditions: ["Arritmia Cardíaca"], doctor: "Dr. Ricardo Mendes" },
  { id: 3, patient: "Ana Oliveira", lastUpdate: "03/04/2026", entries: 5, conditions: ["Dermatite Atópica"], doctor: "Dra. Juliana Alves" },
  { id: 4, patient: "Carlos Souza", lastUpdate: "02/04/2026", entries: 15, conditions: ["Artrose", "Lombalgia"], doctor: "Dr. Fernando Lima" },
  { id: 5, patient: "Lucia Ferreira", lastUpdate: "01/04/2026", entries: 3, conditions: ["Acompanhamento Pediátrico"], doctor: "Dra. Patrícia Nunes" },
];

const [expandedId, setExpandedId] = [0, (_: number) => {}]; // placeholder

export default function Prontuarios() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = records.filter((r) =>
    r.patient.toLowerCase().includes(search.toLowerCase())
  );

  const selectedRecord = records.find((r) => r.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Prontuários</h1>
        <p className="text-sm text-muted-foreground">Histórico médico dos pacientes</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar prontuário..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-2">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`w-full text-left bg-card border rounded-lg p-4 transition-all ${
                selected === r.id ? "border-primary shadow-sm" : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {r.patient.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.patient}</p>
                    <p className="text-xs text-muted-foreground">{r.entries} registros • {r.lastUpdate}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selectedRecord ? (
            <div className="bg-card border border-border rounded-lg">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">{selectedRecord.patient}</h2>
                <p className="text-sm text-muted-foreground">Médico responsável: {selectedRecord.doctor}</p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Condições</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.conditions.map((c) => (
                      <span key={c} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{c}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Histórico de Consultas</h3>
                  <div className="space-y-3">
                    {[
                      { date: "05/04/2026", note: "Paciente relata melhora nos sintomas. Mantida medicação atual. Solicitado exame de sangue de controle.", type: "Consulta" },
                      { date: "20/03/2026", note: "Ajuste de dosagem de medicamento. Orientações sobre dieta e atividade física.", type: "Retorno" },
                      { date: "05/03/2026", note: "Primeira consulta. Avaliação geral realizada. Solicitados exames complementares.", type: "Consulta" },
                    ].map((entry, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          {i < 2 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                        </div>
                        <div className="pb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground">{entry.date}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">{entry.type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium text-foreground">LGPD — Dados Sensíveis</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Este prontuário contém dados sensíveis protegidos pela Lei Geral de Proteção de Dados (Lei 13.709/2018). 
                    O acesso é registrado e monitorado.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Selecione um paciente para ver o prontuário</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
