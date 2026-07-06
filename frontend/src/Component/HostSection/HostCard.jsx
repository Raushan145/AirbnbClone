import {
  FaStar,
  FaMedal
} from "react-icons/fa";

export default function HostCard() {
  return (
    <div className="bg-white rounded-3xl h-[300px] w-[400px] md:ml-0 ml-10 shadow-xl mt-10 p-8">

      <div className="grid grid-cols-2 gap-5">

        <div className="text-center">

          <img
            src="https://i.pravatar.cc/200"
            alt=""
            className="w-20 h-20 rounded-full mx-auto object-cover"
          />

          <h2 className="text-2xl font-bold mt-4">
            Abhinav
          </h2>

          <div className="flex justify-center items-center gap-2 mt-2 text-gray-600">
            <FaMedal />
            Superhost
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <h2 className="text-2xl font-bold">223</h2>
            <p className="text-gray-500">Reviews</p>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              4.78
              <FaStar className="text-black text-lg" />
            </h2>

            <p className="text-gray-500">
              Rating
            </p>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-bold">2</h2>

            <p className="text-gray-500">
              Years hosting
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}