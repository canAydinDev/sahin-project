import { getPatient } from "@/lib/actions/patient.actions";
import { AppointmentForm } from "@/modules/home/ui/components/forms/appointment-form";
import Image from "next/image";

interface NewAppointmentProps {
  params: Promise<{ userId: string }>;
}

export default async function NewAppointment({ params }: NewAppointmentProps) {
  const { userId } = await params;
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="hasta"
            className="mb-12 h-10 w-ft"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-10 py-12">© 2024 BizimKlinik</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
