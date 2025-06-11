import { getUser } from "@/lib/actions/patient.actions";
import { RegisterForm } from "@/modules/home/ui/components/forms/register-form";
import Image from "next/image";

interface RegisterProps {
  params: Promise<{ userId: string }>;
}

const Register = async ({ params }: RegisterProps) => {
  const { userId } = await params;
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="hasta"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 BizimKlinik</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="hasta"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
