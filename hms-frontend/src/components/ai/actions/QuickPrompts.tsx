interface Props {
  onSelect: (prompt: string) => void;
}

const prompts = [
  "Diagnose Symptoms",
  "Explain Lab Report",
  "Prescription Advice",
  "Generate Discharge Summary",
  "Suggest Medicines",
  "Interpret Blood Report",
];

export default function QuickPrompts({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {prompts.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="px-4 py-2 rounded-full border hover:bg-blue-50 hover:border-blue-500 transition text-sm"
        >
          {item}
        </button>
      ))}
    </div>
  );
}