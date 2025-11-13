interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({
  language,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <select
      value={language}
      onChange={(e) => onLanguageChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
    >
      <option value="english">English</option>
      <option value="bengali">বাংলা</option>
    </select>
  );
}
