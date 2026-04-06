import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Patient {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  bloodType: string;
  status: "Ativo" | "Inativo";
}

const initialPatients: Patient[] = [
  { id: 1, name: "Maria Silva", cpf: "***.***.***-12", birthDate: "15/03/1981", phone: "(11) 98765-4321", email: "maria@email.com", bloodType: "O+", status: "Ativo" },
  { id: 2, name: "João Santos", cpf: "***.***.***-34", birthDate: "22/07/1964", phone: "(11) 91234-5678", email: "joao@email.com", bloodType: "A+", status: "Ativo" },
  { id: 3, name: "Ana Oliveira", cpf: "***.***.***-56", birthDate: "08/11/1993", phone: "(21) 99876-5432", email: "ana@email.com", bloodType: "B-", status: "Ativo" },
  { id: 4, name: "Carlos Souza", cpf: "***.***.***-78", birthDate: "30/01/1969", phone: "(31) 98765-1234", email: "carlos@email.com", bloodType: "AB+", status: "Ativo" },
  { id: 5, name: "Lucia Ferreira", cpf: "***.***.***-90", birthDate: "14/09/1998", phone: "(41) 97654-3210", email: "lucia@email.com", bloodType: "O-", status: "Inativo" },
];

export default function Pacientes() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newPatient: Patient = {
      id: patients.length + 1,
      name: fd.get("name") as string,
      cpf: `***.***.***-${Math.floor(Math.random() * 100).toString().padStart(2, "0")}`,
      birthDate: fd.get("birthDate") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      bloodType: fd.get("bloodType") as string,
      status: "Ativo",
    };
    setPatients([newPatient, ...patients]);
    setDialogOpen(false);
    toast.success("Paciente cadastrado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pacientes</h1>
          <p className="text-sm text-muted-foreground">{patients.length} pacientes cadastrados</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Novo Paciente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Paciente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input id="birthDate" name="birthDate" placeholder="DD/MM/AAAA" required />
                </div>
                <div>
                  <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                  <Input id="bloodType" name="bloodType" placeholder="O+" required />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" name="phone" placeholder="(11) 99999-9999" required />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
              <Button type="submit" className="w-full">Cadastrar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar paciente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Paciente</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">CPF</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Nascimento</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden sm:table-cell">Telefone</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Tipo Sang.</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {p.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{p.cpf}</td>
                  <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{p.birthDate}</td>
                  <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{p.phone}</td>
                  <td className="px-5 py-3"><span className="bg-destructive/10 text-destructive text-xs px-2 py-0.5 rounded font-medium">{p.bloodType}</span></td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === "Ativo" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
