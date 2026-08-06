import { FaTimes } from "react-icons/fa";

export default function AboutPlaceModal({
  open,
  onClose,
  description,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end md:items-center">

      <div className="bg-white w-full md:max-w-3xl rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">

          <h2 className="text-2xl font-semibold">
            About this place
          </h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="p-6 space-y-6">

          <h3 className="text-xl font-semibold">
            Entire Description
          </h3>

          <p className="leading-8 text-gray-700">
            {description}

            <br /><br />

            The property provides premium amenities including
            free Wi-Fi, air conditioning, smart TV, kitchen,
            parking, washing machine, and 24×7 support.

            <br /><br />

            Nearby attractions include temples, ghats,
            restaurants, shopping markets, railway station,
            and airport connectivity.
          </p>

        </div>

      </div>

    </div>
  );
}