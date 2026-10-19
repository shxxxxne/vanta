import React from 'react';
import TrainerHero from '@/components/trainers/Trainerhero';
import TrainerGrid from '@/components/trainers/Trainergrid';
import Container from '@/components/layout/Container';

export default function TrainersPage() {
  return (
    <>
      <TrainerHero />
      <section className="section-alt section-y">
        <Container>
          <TrainerGrid />
        </Container>
      </section>
    </>
  );
}
