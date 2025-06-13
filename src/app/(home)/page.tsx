import { PasskeyModal } from "@/modules/home/ui/components/admin-panel/passkey-modal";
import { PatientForm } from "@/modules/home/ui/components/forms/patient-form";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const isAdmin = (await searchParams)?.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="hasta"
            className="mb-12 h-10 w-ft"
          />
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-gray-600 xl:text-left">
              © 2024 BizimKlinik
            </p>
            <Link href="/?admin=true" className="text-green-600">
              Yönetim Paneli
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="hasta"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
