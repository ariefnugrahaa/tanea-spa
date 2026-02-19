import { Suspense } from 'react';
import { IntakeContent } from './IntakeContent';

export default function IntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading...</div>}>
      <IntakeContent />
    </Suspense>
  );
}
