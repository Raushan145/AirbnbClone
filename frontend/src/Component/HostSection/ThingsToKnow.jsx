import {
  FaChevronRight,
  FaShieldAlt,
  FaKey,
  FaCalendarAlt,
} from "react-icons/fa";

const items = [
  {
    icon: FaCalendarAlt,
    title: "Cancellation policy",
    desc: "Free cancellation before 19 July.",
  },
  {
    icon: FaKey,
    title: "House rules",
    desc: "Check-in after 1PM\nCheckout before 11AM\n13 guests maximum",
  },
  {
    icon: FaShieldAlt,
    title: "Safety & property",
    desc: "Smoke alarm not reported.",
  },
];

export default function ThingsToKnow() {
  return (
    <div className=" mt-10 pt-10 w-[90%] mx-auto ">
      <h2 className="text-3xl font-semibold mb-8">
        Things to know
      </h2>

      <div className="space-y-6">

        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-start pb-2"
          >
            <div className="flex gap-4">

              <item.icon className="text-2xl mt-1" />

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-500 whitespace-pre-line">
                  {item.desc}
                </p>

              </div>

            </div>

            <FaChevronRight />
          </div>
        ))}

      </div>

    </div>
  );
}