import HostCard from "./HostCard";
import ThingsToKnow from "./ThingsToKnow";

export default function HostSection() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-5 border-t  mt-8">

      <h2 className="text-3xl font-semibold mb-1">
        Meet your host
      </h2>

      <div className="grid lg:grid-cols-2 gap-12">

        <HostCard />

        <div>

          <div className="flex items-center gap-3 mb-8">
            🌐
            <span>Speaks English and Hindi</span>
          </div>

          <h3 className="text-2xl font-semibold">
            Abhinav is a Superhost
          </h3>

          <p className="text-gray-600 mt-3">
            Superhosts are experienced, highly rated hosts committed to
            providing great stays for guests.
          </p>

          <div className="mt-8">
            <h4 className="font-semibold text-xl mb-3">
              Host details
            </h4>

            <p>Response rate: 100%</p>

            <p>Responds within an hour</p>
          </div>

          <button
            className="mt-8 w-full sm:w-64 border rounded-xl py-3 font-semibold hover:bg-black hover:text-white transition"
          >
            Message host
          </button>

          <div className="flex gap-3 mt-8 text-sm text-gray-500">
            🛡️
            <p>
              To help protect your payment, always use Airbnb to send
              money and communicate with hosts.
            </p>
          </div>

        </div>

      </div>

      <ThingsToKnow />

    </section>
  );
}