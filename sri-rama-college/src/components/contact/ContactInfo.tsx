const ContactInfo = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-4 sm:mb-6">
        Get In Touch
      </h2>

      <p className="text-sm sm:text-base text-gray-600 leading-7 sm:leading-8 mb-6 sm:mb-8 max-w-full text-left break-words">
  We are happy to assist students, parents, and visitors with admissions,
  courses, campus facilities, and general enquiries related to Sri Rama First
  Grade College.
</p>

      <div className="space-y-4 sm:space-y-6">
        {/* Address */}
        <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
            Address
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-6">
            Sri Rama First Grade College <br />
            Hanuman Nagara, Kalladka <br />
            Affiliated to Mangalore University
          </p>
        </div>

        {/* Phone */}
        <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
            Phone
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-6">
            96632 63049 <br />
            99805 40907 
          </p>
        </div>

        {/* Email */}
        <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
            Email
          </h3>
          <p className="text-sm sm:text-base text-gray-700 break-all">
            srfgck@gmail.com
          </p>
        </div>

        {/* Working Hours */}
        <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
            Working Hours
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-6">
            Monday to Saturday <br />
            9:00 AM to 5:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;