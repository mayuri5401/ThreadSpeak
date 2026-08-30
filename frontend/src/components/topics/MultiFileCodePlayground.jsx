import React from 'react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';

export default function MultiFileCodePlayground({
  files = {},
  initialActiveFile = 'TicTacToeDemo.java',
  expectedOutput = '',
  title = 'Interactive LLD Project Workspace'
}) {
  return (
    <UniversalCodePlayground
      title={title}
      files={files}
      initialActiveFile={initialActiveFile}
      expectedOutput={expectedOutput}
      defaultHeight="min-h-[420px]"
    />
  );
}
