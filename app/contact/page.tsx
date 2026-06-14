export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Contact Us
        </h1>

        <p className="text-gray-300 mb-8">
          Have questions, partnership opportunities, or need support?
          We'd love to hear from you.
        </p>

        <div className="bg-slate-900 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold mb-4">
            Email
          </h2>

          <a
            href="mailto:sofboatrental@gmail.com"
            className="text-blue-400"
          >
            sofboatrental@gmail.com
          </a>

          <p className="mt-6 text-gray-400">
            We aim to respond within 24–48 hours.
          </p>

        </div>

      </div>
    </main>
  );
}