import { useState } from "react";
import { FaKey, FaMapMarkerAlt, FaMedal } from "react-icons/fa";
import AboutPlaceModal from "./AboutPlaceModel";

export default function About() {
  const [openAboutPopUp, setOpenAboutPopUp] = useState(false);

  const description = `Luxurious 3BHK Stay | Power Backup | Premium Interiors | Fully Equipped Home

                Welcome to your perfect home away from home! This newly designed 3BHK luxury apartment offers a seamless blend of comfort, elegance, and modern convenience -ideal for families, business travelers, or groups seeking a premium stay.

                The space

               <b> Living & Dining</b>

                - Spacious living area with an elegant L-

                shaped sofa set

                - Stylish dining table with elite marble finish,

                offering a premium and sophisticated look

                - Smart TV for entertainment and relaxation

                - Cozy ambient lighting with luxury interiors throughout

                Bedrooms

                - 2 Bedrooms with King-Size Beds featuring high-quality orthopedic mattresses for

                superior comfort

                - 1 Bedroom with 2 Single Beds, perfect for

                kids or friends

                - Fresh linens, cozy lighting, and thoughtfully designed interiors in all rooms

                Washrooms

                - 2 modern washrooms (Both are Western)

                - 1 attached washroom to the first bedroom

                -1 common washroom accessible from the

                living area

                - Equipped with geysers for hot water

                *Comfort & Amenities

                - Air-conditioning in all bedrooms

                -High-speed Wi-Fi

                -SmartTV

                -Power backup with inverter

                - Geysers with 24/7 hot water

                - Washing machine

                - Inverter power backup to ensure uninterrupted comfort during power outages (lights, fans, and essential appliances)

                Modular Kitchen

                - Fully equipped modular kitchen with

                chimney

                - Refrigerator

                - Microwave

                - Electric kettle

                -RO water purifier

                -Mixer Grinder

                - Complete cooking utensils and appliances

                for hassle-free home cooking

                *Why You'll Love This Stay

                - Brand-new home with premium-quality

                interiors

                - Comfortable orthopedic mattresses for

                restful sleep

                - Modern modular kitchen with chimney

                - Reliable power backup for peace of mind

                - Ideal for family vacations, business trips, or extended stays

                - Clean, cozy, and thoughtfully curated for a luxury living experience

                Relax, unwind, and enjoy a truly comfortable stay in this elegant and fully furnished 3BHK home, thoughtfully designed to make you feel right at home.

                Enjoy a restful sleep, modern comforts, and a homely environment during your stay in Varanasi. We look forward to hosting you!

                Guest access

                Full Access to Flat

                Parking Available

                Other things to note

                - Early check-in/late check-out subject to

                availability and prior approval

                - Only booked guests allowed; visitors not

                permitted without host approval

                for all guests

                -Valid government-issued photo ID required

                -Smoking and drinking strictly prohibited

                inside the apartment

                - No parties, events, or loud gatherings - Quiet hours: 10:00 PM–7:00 AM

                - Pets not allowed

                - Please treat the property, furniture, and

                guest

                - Any damage or loss will be charged to the

                appliances with care

                - Switch off gas, chimney, ACs, and electrical

                appliances when not in use

                - Inverter power backup available only for lights, fans, and essential appliances

                - Lock doors and windows when leaving the apartment

                Guests are welcome to use the kitchen as per their requirement.

                We can provide early check-in, if the

                apartment is available on the day of arrival i.e there are no previous bookings. Please

                confirm if early check-in is required.

                The apartment building has a lift available.

                Lift and big electrical appliances like AC and Geyser etc only work with electricity.

                The property is for tourists and travellers who

                are visiting Varanasi to explore the city, it's

                vibrant culture, heritage and energy. If you

                activities like partying etc, or some other illegal activity, please do not book this

                property.

                are a local Guest guest and planning

                If you are local guest, please do not book this property. Local id's are also not acceptable.

                Students studying in the city are not allowed to book.

                Drinking and partying is strictly prohibited on this property.

                Any illegal activity is not allowed on this.`;

  return (
    <>
      <div className="border-y py-8 ">

        <div className="space-y-6">

          <div className="flex gap-4">
            <FaKey className="text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg">
                Exceptional check-in experience
              </h3>
              <p className="text-gray-500">
                Recent guests gave the check-in process a 5-star rating.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaMapMarkerAlt className="text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg">
                Unbeatable location
              </h3>
              <p className="text-gray-500">
                100% of guests rated this location 5 stars.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaMedal className="text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg">
                Superhost
              </h3>
              <p className="text-gray-500">
                Experienced and highly rated host.
              </p>
            </div>
          </div>

        </div>

        <p className="mt-8 text-gray-700 line-clamp-5">
          {description}
        </p>

        <button
          onClick={() => setOpenAboutPopUp(true)}
          className="mt-6 w-full bg-gray-100 rounded-xl py-3 font-semibold hover:bg-gray-200"
        >
          Show more
        </button>

      </div>

         {openAboutPopUp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-500">
          <div className="bg-white w-[60%] md:w-[60%] h-[80vh] rounded-2xl overflow-hidden">

            {/* Fixed Header */}
            <div className="sticky top-0 bg-white border-b px-6 h-16 flex items-center justify-between z-10">

              <h2 className="text-xl font-semibold">
               About this place
              </h2>
              <button
                onClick={() => setOpenAboutPopUp(false)}
                className="text-2xl font-bold hover:bg-gray-100 h-10 absolute right-5 w-10 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              {/* Empty div for center alignment */}
              <div className="w-10"></div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-[calc(80vh-64px)] px-6 ">
                    <p className="mt-8 text-gray-700 ">
                        {description}
                    </p>
            </div>

          </div>
        </div>
      )}

         <AboutPlaceModal
        // open={open}
        // onClose={() => setOpen(false)}
        // description={description}
      />
    </>
  );
}