import cardLookup from "@/utils/cardLookup";

export function CardComponent({ card }) {
  const suit = cardLookup.suits[card.suit] || {};
  const value = cardLookup.values[card.value] || card.value;
  const localImageUrl = cardLookup.getImageUrl(card.code);

  return (
    <div className="w-16 h-24 bg-gray-600 flex items-center justify-center rounded-lg shadow-lg">
      <img src={localImageUrl} alt={suit.icon} className="w-full h-full object-contain" />
    </div>
  );
}