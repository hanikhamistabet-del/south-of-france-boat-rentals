export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">
            SOF Boat Rentals
          </h1>

          <p className="text-xs tracking-[0.3em] text-gray-400">
            SOUTH OF FRANCE & MEDITERRANEAN
          </p>
        </div>

        <div className="flex gap-4">

          <a
            href="/boats"
            className="bg-slate-800 px-4 py-2 rounded-lg"
          >
            Browse Boats
          </a>

          <a
            href="/login"
            className="bg-slate-800 px-4 py-2 rounded-lg"
          >
            Log In
          </a>

          <a
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Create Account
          </a>

        </div>
      </nav>

      <section className="text-center px-6 py-24 max-w-6xl mx-auto">

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          South of France &
          <br />
          Mediterranean Boat Rentals
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto">
          Discover unique boats directly from owners.
          No commissions. No middlemen.
          Direct contact between renters and owners.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm">

          <span className="bg-slate-800 px-4 py-2 rounded-full">
            ✓ No Commissions
          </span>

          <span className="bg-slate-800 px-4 py-2 rounded-full">
            ✓ Direct Owner Contact
          </span>

          <span className="bg-slate-800 px-4 py-2 rounded-full">
            ✓ Free Listings
          </span>

          <span className="bg-slate-800 px-4 py-2 rounded-full">
            ✓ Mediterranean Focus
          </span>

        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-center gap-4">

          <a
            href="/boats"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg transition"
          >
            Browse Boats
          </a>

          <a
            href="/signup"
            className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-xl text-lg transition"
          >
            Create Account
          </a>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold">
              Free Listings
            </h3>

            <p className="mt-4 text-gray-400">
              Add your boat in minutes and start receiving inquiries immediately.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold">
              No Commissions
            </h3>

            <p className="mt-4 text-gray-400">
              Keep 100% of your rental income.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold">
              Direct Contact
            </h3>

            <p className="mt-4 text-gray-400">
              Owners and renters communicate directly.
            </p>
          </div>

        </div>

      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="bg-slate-900 rounded-3xl p-10 text-center">

          <h2 className="text-4xl font-bold">
            Premium Visibility
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Basic listings are free forever.
            Premium listings receive featured placement and additional exposure.
          </p>

        </div>

      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">

        <div className="bg-blue-600 rounded-3xl p-12 text-center">

          <h2 className="text-4xl font-bold">
            Ready To List Your Boat?
          </h2>

          <p className="mt-4 text-lg">
            Join owners across the South of France and the Mediterranean.
          </p>

          <a
            href="/signup"
            className="inline-block mt-8 bg-white text-black px-8 py-4 rounded-xl font-semibold"
          >
            Create Free Account
          </a>

        </div>

      </section>

      <footer className="border-t border-slate-800">

        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <h3 className="text-xl font-bold">
                SOF Boat Rentals
              </h3>

              <p className="text-gray-400 mt-3">
                Connecting boat owners and renters across the South of France and the Mediterranean.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Quick Links
              </h4>

              <div className="flex flex-col gap-2 text-gray-400">
                <a href="/boats">Browse Boats</a>
                <a href="/signup">Create Account</a>
                <a href="/login">Log In</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Support
              </h4>

              <a
                href="mailto:sofboatrental@gmail.com"
                className="text-gray-400"
              >
                sofboatrental@gmail.com
              </a>

              <p className="text-gray-500 text-sm mt-3">
                Questions, support, advertising opportunities or partnership inquiries.
              </p>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-8 pt-6 text-sm text-gray-500">

            <p>
              © 2026 SOF Boat Rentals. All rights reserved.
            </p>

            <p className="mt-3">
              SOF Boat Rentals acts solely as a listing platform. Boat owners and renters communicate directly. Rental agreements, payments, insurance and legal responsibilities remain solely between the parties involved.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}