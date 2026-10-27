const GoogleMap = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-10">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Our Location</h2>

      <div className="w-full h-[400px] rounded-xl overflow-hidden">
        <iframe
          title="Sri Rama First Grade College Location"
          src="https://www.google.com/maps?q=Kalladka,+Karnataka&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default GoogleMap;