export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              SOF Boat Rentals
            </h1>

            <p className="text-xs tracking-[0.3em] text-gray-400 mt-1">
              SOUTH OF FRANCE & MEDITERRANEAN
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="/boats"
              className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg text-center transition"
            >
              Browse Boats
            </a>

            <a
              href="/login"
              className="bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-lg text-center transition"
            >
              Log In
            </a>

            <a
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg text-center transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          South of France &
          <br />
          Mediterranean Boat Rentals
        </h1>

        <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Discover unique boats directly from owners. No commissions. No
          middlemen. Direct contact between renters and owners.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
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

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
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

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold">Free Listings</h3>

            <p className="mt-4 text-gray-400">
              Add your boat in minutes and start receiving inquiries.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold">No Commissions</h3>

            <p className="mt-4 text-gray-400">
              Keep 100% of your rental income.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold">Direct Contact</h3>

            <p className="mt-4 text-gray-400">
              Owners and renters communicate directly.
            </p>
          </div>
        </div>
      </section>

      {/* Premium */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Premium Visibility
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Basic listings are free forever. Premium listings receive featured
            placement and extra exposure.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-blue-600 rounded-3xl p-6 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
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

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold">SOF Boat Rentals</h3>

              <p className="text-gray-400 mt-3">
                Connecting boat owners and renters across the South of France
                and the Mediterranean.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>

              <div className="flex flex-col gap-2 text-gray-400">
                <a href="/boats">Browse Boats</a>
                <a href="/signup">Create Account</a>
                <a href="/login">Log In</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>

              <a
                href="mailto:sofboatrental@gmail.com"
                className="text-gray-400"
              >
                sofboatrental@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}