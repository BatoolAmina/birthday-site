// Giant outlined marquee that sits between sections
export default function Ticker({ words = ["Happy Birthday", "Make a wish", "Barakah", "Celebrate", "Smile"] }) {
  const row = [...words, ...words];
  return (
    <div className="relative z-10 overflow-hidden border-y border-gold/20 py-6">
      <div className="animate-ticker flex w-max">
        {row.concat(row).map((w, i) => (
          <span key={i} className="outline-text mr-12 font-display text-6xl italic md:text-8xl">
            {w} <span className="ml-12 text-gold/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
