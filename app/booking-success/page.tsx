export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="bg-slate-900 p-10 rounded-2xl max-w-xl text-center">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Booking Request Sent
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Your booking request has been sent successfully.
          The yacht owner has received your request and
          will contact you shortly.
        </p>

        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg inline-block"
        >
          Back to Home
        </a>

      </div>
    </main>
  );
}