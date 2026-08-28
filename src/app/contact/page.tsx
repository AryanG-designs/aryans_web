import { getSettings } from "@/lib/settings";
import ContactClient from "@/components/ContactClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactClient settings={settings} />;
}
