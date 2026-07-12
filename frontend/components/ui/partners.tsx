'use client';
export function Partners() {
  const partners = ['Erasmus+', 'ESC', 'EU Commission', 'DAAD', 'Fulbright', 'British Council'];
  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground text-sm mb-8 uppercase tracking-wider">Tərəfdaşlarımız</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((p, i) => (
            <div key={i} className="text-muted-foreground hover:text-foreground transition-colors font-semibold text-lg">{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
