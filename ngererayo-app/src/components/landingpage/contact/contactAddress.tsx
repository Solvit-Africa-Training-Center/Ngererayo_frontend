// src/pages/ContactUs.tsx
import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-2">visit our office</h2>
        <p className="text-center text-gray-600 mb-10">
          Come meet our team at our Kigali Office
        </p>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <MapPin className="text-green-600 w-6 h-6" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">
                  KK 123 St, Nyarugenge <br /> Kigali, Rwanda.
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex items-start space-x-4">
              <Clock className="text-yellow-500 w-6 h-6" />
              <div>
                <h3 className="font-semibold">Office Hours</h3>
                <p className="text-gray-600">
                  Monday – Friday: 8:00 AM – 5:00 PM <br />
                  Saturday: 9:00 AM – 1:00 PM
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <Phone className="text-blue-600 w-6 h-6" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">07899383887</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.70741854309!2d30.11131367496532!3d-1.9535245980241638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6e2ff1c0c07%3A0x5b6dca9a66f75e0c!2sSOLVIT%20AFRICA%20Headquarters!5e0!3m2!1sen!2srw!4v1694527896714!5m2!1sen!2srw"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
