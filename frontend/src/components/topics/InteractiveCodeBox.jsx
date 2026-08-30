import React from 'react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';

export default function InteractiveCodeBox({ 
  title = "Main.java", 
  initialCode = "", 
  expectedOutput = "", 
  scenarioId = "custom",
  explanation = ""
}) {
  return (
    <UniversalCodePlayground
      title={title}
      initialCode={initialCode}
      expectedOutput={expectedOutput}
      scenarioId={scenarioId}
      explanation={explanation}
      defaultHeight="min-h-[320px]"
    />
  );
}
