import type { AppProps } from 'next/app';
import { Layout } from '@/components/Layout';
import { AnimalProvider } from '@/contexts/AnimalContext';
import '@/styles/globals.css';

interface CustomPageProps {
  initialAnimals?: any[];
}

export default function App({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) {
  return (
    <AnimalProvider initialAnimals={pageProps.initialAnimals || []}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimalProvider>
  );
}
