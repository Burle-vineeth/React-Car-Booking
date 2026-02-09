import { Circle, MapPin } from "lucide-react";
import CustomForm, { type FormField } from "../../shared/components/CustomForm";
import Header from "../Layout/Header";

function Home() {
  const formFields: FormField<string>[] = [
    {
      type: "select",
      size: 12,
      onSelect: () => {},
      placeholder: "Enter pickup location",
      inputIcon: MapPin,
    },
    {
      type: "select",
      size: 12,
      onSelect: () => {},
      placeholder: "Enter drop location",
      inputIcon: Circle,
    },
  ];

  return (
    <>
      <Header />
      <CustomForm formFields={formFields} />
    </>
  );
}

export default Home;
