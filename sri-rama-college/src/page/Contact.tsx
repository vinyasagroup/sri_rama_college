import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMap from "@/components/contact/GoogleMap";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl">Your Future Is Our Focus</p>
      </section>

      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        <ContactInfo />
        <ContactForm />
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <GoogleMap />
      </section>
    </div>
  );
};

export default Contact;