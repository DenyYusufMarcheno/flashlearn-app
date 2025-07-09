// src/components/SectionLayout.jsx
import React from 'react';

function SectionLayout({ title, children }) {
  return (
    <section className="mb-10 pt-5 border-t border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default SectionLayout;