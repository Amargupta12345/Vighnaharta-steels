import React from 'react';
import Head from 'next/head';
import BrandExamples from '../components/BrandExamples';

/**
 * Brand Style Guide Examples Page
 * Visit /brand-examples to see all brand color usage examples
 */
export default function BrandExamplesPage() {
  return (
    <>
      <Head>
        <title>Brand Style Guide Examples - Vighnaharta Steel Corporation</title>
        <meta
          name="description"
          content="Visual examples of Vighnaharta Steel brand colors, typography, and component usage."
        />
      </Head>
      <BrandExamples />
    </>
  );
}
