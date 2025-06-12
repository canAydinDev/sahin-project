import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/modules/home/ui/components/admin-panel/table/data-tabel";
import { StatCard } from "@/modules/home/ui/components/admin-panel/stat-card";
import {
  columns,
  Payment,
} from "@/modules/home/ui/components/admin-panel/table/columns";
import Image from "next/image";
import Link from "next/link";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={162}
            height={32}
            className="h-8 w-fitt"
          />
        </Link>
        <p className="text-16-semibold">Yönetim Paneli</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Hoş geldiniz</h1>
          <p className="text-gray-400">
            Gününüze yeni randevuları yöneterek başlayın.
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Planlanmış Randevular"
            icon="/assets/icons/appointments.svg"
          />

          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Bekleyen Randevular"
            icon="/assets/icons/pending.svg"
          />

          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="İptal Edilen Randevular"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
