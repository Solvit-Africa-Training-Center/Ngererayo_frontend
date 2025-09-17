// components/ContactForm.tsx
import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Send us a Message</h2>
        <p className="text-gray-600">Fill out the form and we’ll get back to you as soon as possible</p>
      </div>

      <form className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address *</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Inquiry Type</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
              defaultValue="General Inquiry"
            >
              <option>General Inquiry</option>
              <option>Product Support</option>
              <option>Business</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject *</label>
            <input
              type="text"
              placeholder="Brief subject of your message"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Send message
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
