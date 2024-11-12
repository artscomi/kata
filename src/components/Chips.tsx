type ChipListProps = {
  chips?: { label: string }[];
  maxChips?: number;
  maxTextLength?: number;
};

const Chips = ({ chips, maxChips, maxTextLength }: ChipListProps) => {
  const displayedChips =
    maxChips && maxChips > 0 ? chips?.slice(0, maxChips) : chips;

  if (!chips) return null;

  const excessChips =
    maxChips && maxChips > 0 && maxChips <= chips.length
      ? chips?.length - maxChips
      : null;

  return (
    <>
      <h2>Chip component</h2>
      <section
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {displayedChips?.map((chip, index) => {
          const label =
            maxTextLength === 0 ? "" : chip.label.slice(0, maxTextLength);
          return (
            <div
              key={index}
              style={{
                border: "1px solid #bbbbbb",
                padding: "4px",
                borderRadius: "8px",
              }}
            >
              {label}
            </div>
          );
        })}
        {excessChips ? (
          <aside>{chips.length - (maxChips ?? chips.length)} more items</aside>
        ) : null}
      </section>
    </>
  );
};

export default Chips;
