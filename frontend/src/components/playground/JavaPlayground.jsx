import React from 'react';
import UniversalCodePlayground from './UniversalCodePlayground';

export default function JavaPlayground({ initialCode }) {
  return (
    <div className="space-y-6">
      <UniversalCodePlayground
        title="Java 21 Virtual Engine"
        initialCode={initialCode}
        showScenarioPicker={true}
        defaultHeight="min-h-[480px]"
      />
    </div>
  );
}
