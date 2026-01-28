export default function Price({ price, finalPrice, isOnOffer }) {
  return (
    <div className="flex items-center gap-2">
      {isOnOffer && (
        <span className="text-sm line-through text-slate-400">{price} EGP</span>
      )}

      <span className="text-lg font-semibold text-sky-400">
        {finalPrice} EGP
      </span>
    </div>
  );
}
