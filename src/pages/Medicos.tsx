import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Doctor {
  id: number;
  name: string;
  crm: string;
  specialty: string;
  phone: string;
  status: "Ativo" | "Inativo";
}

const initialDoctors: Doctor[] = [
  { id: 1, name: "Dr. Ricardo Mendes", crm: "CRM/SP 123456", specialty: "Cardiologia", phone: "(11) 91111-2222", status: "Ativo" },
  { id: 2, name: "Dra. Juliana Alves", crm: "CRM/SP 234567", specialty: "Dermatologia", phone: "(11) 93333-4444", status: "Ativo" },
  { id: 3, name: "Dr. Fernando Lima", crm: "CRM/RJ 345678", specialty: "Ortopedia", phone: "(21) 95555-6666", status: "Ativo" },
  { id: 4, name: "Dra. Patrícia Nunes", crm: "CRM/MG 456789", specialty: "Pediatria", phone: "(31) 97777-8888", status: "Ativo" },
  { id: 5, name: "Dr. Marcos Ribeiro", crm: "CRM/SP 567890", specialty: "Neurologia", phone: "(11) 99999-0000", status: "Inativo" },
];

const specialtyColors: Record<string, string> = {
  Cardiologia: "bg-destructive/10 text-destructive",
  Dermatologia: "bg-accent/10 text-accent",
  Ortopedia: "bg-primary/10 text-primary",
  Pediatria: "bg-warning/10 text-warning",
  Neurologia: "bg-info/10 text-info",
};

export default function Medicos() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const doc: Doctor = {
      id: doctors.length + 1,
      name: fd.get("name") as string,
      crm: fd.get("crm") as string,
      specialty: fd.get("specialty") as string,
      phone: fd.get("phone") as string,
      status: "Ativo",
    };
    setDoctors([doc, ...doctors]);
    setDialogOpen(false);
    toast.success("Médico cadastrado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Médicos</h1>
          <p className="text-sm text-muted-foreground">{doctors.length} médicos cadastrados</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Novo Médico</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Cadastrar Médico</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div><Label htmlFor="name">Nome Completo</Label><Input id="name" name="name" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="crm">CRM</Label><Input id="crm" name="crm" placeholder="CRM/UF 000000" required /></div>
                <div><Label htmlFor="specialty">Especialidade</Label><Input id="specialty" name="specialty" required /></div>
              </div>
              <div><Label htmlFor="phone">Telefone</Label><Input id="phone" name="phone" required /></div>
              <Button type="submit" className="w-full">Cadastrar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar médico..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((d) => (
          <div key={d.id} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {d.name.replace(/Dr\.?a?\s*/i, "").split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.crm}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${d.status === "Ativo" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {d.status}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded font-medium ${specialtyColors[d.specialty] || "bg-muted text-muted-foreground"}`}>
                {d.specialty}
              </span>
              <span className="text-xs text-muted-foreground">{d.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
