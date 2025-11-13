interface ExplanationViewProps {
  explanation: string;
  loading: boolean;
}

export default function ExplanationView({
  explanation,
  loading,
}: ExplanationViewProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 rounded-lg border">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Analyzing your code...</p>
        </div>
      </div>
    );
  }

  if (!explanation) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 rounded-lg border text-gray-500">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <p>Explanation will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-80 bg-white rounded-lg border p-4 overflow-y-auto">
      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
        {explanation}
      </div>
    </div>
  );
}
