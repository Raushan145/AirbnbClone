export default function RatingItem({ title, value, icon }) {
  return (
    <div className="border-r last:border-r-0 pr-4">
      <h4 className="text-sm text-gray-500">{title}</h4>

      <p className="font-semibold text-lg">{value}</p>

      <div className="text-2xl mt-4">
        {icon}
      </div>
    </div>
  );
}