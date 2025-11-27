import { useState } from "react";
import { MOCK_RESULT } from "@/lib/mock-data";

export function useSimulator() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof MOCK_RESULT | null>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Giả vờ đợi 2 giây
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setIsAnalyzing(false);
    }, 2000);
  };

  return { isAnalyzing, result, startAnalysis };
}