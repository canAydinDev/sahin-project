"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";

import { CustomFormField } from "../custom-form-field";
import { SubmitButton } from "../submit-button";
import { useState } from "react";
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "../patient-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { FileUploader } from "../file-uploader";

interface RegisterFormProps {
  user: User;
}

export const RegisterForm = ({ user }: RegisterFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-ignore
      const patient = await registerPatient(patientData);
      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Hoşgeldiniz 👋 </h1>
          <p className="text-gray-400">Bize biraz kendinizden bahsedin...</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Kişisel Bilgileriniz</h2>
          </div>
        </section>
        <CustomFormField<z.infer<typeof UserFormValidation>>
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Adı Soyadı"
          placeholder="Adı Soyadı"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="adiniz@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Tel"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Doğum Tarihi"
          />
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Cinsiyet"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Adres"
            placeholder="5432 sok. Seyhan / Adana"
          />

          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Meslek"
            placeholder="Mesleğiniz"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Acil Durumda Aranacak Kişi"
            placeholder="Kişinin ismi"
          />
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Acil Durum İletişim No"
            placeholder="(555) 123-4567"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Tıbbi Geçmişiniz</h2>
          </div>
        </section>

        <CustomFormField<z.infer<typeof UserFormValidation>>
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Doktorunuz"
          placeholder="Dr. Şahin Irkılata"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex items-center cursor-pointer gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-gray-700"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Sigortalı Durumu"
            placeholder="SGK"
          />

          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Sigorta Numarası"
            placeholder="ABC123456789"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allerji Durumu"
            placeholder="Yer Fıstığı"
          />

          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Kullanılan İlaçlar"
            placeholder="Paracetamol 500mg"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Aile Öyküsü"
            placeholder="DM, HT"
          />

          <CustomFormField<z.infer<typeof UserFormValidation>>
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Tıbbi Geçmişi"
            placeholder="Apendektomi"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Kimlik Tespiti ve Doğrulama</h2>
          </div>
        </section>

        <CustomFormField<z.infer<typeof UserFormValidation>>
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Kimlik Tipi"
          placeholder="Ehliyet"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField<z.infer<typeof UserFormValidation>>
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Kimlik No"
          placeholder="12345678911"
        />

        <CustomFormField<z.infer<typeof UserFormValidation>>
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Kimlik Belgenizi Yükleyiniz"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Kabul ve Gizlilik Politikası</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="Tedaviye onay veriyorum"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="Bilgilerimin paylaşılmasına onay veriyorum"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Gizlilik politikasını okudum ve kabul ediyorum"
        />

        <SubmitButton isLoading={isLoading}>Şimdi Kaydolun...</SubmitButton>
      </form>
    </Form>
  );
};
