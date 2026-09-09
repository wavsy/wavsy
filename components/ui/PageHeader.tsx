import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  title: string;
  lead: string;
};

export function PageHeader({ title, lead }: PageHeaderProps) {
  return (
    <Container className="pt-[calc(var(--header-h)+4rem)] pb-12 md:pb-16">
      <h1 className="max-w-[12ch] font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-[-0.05em] text-ink">
        {title}
      </h1>
      <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-7 text-ink/80">
        {lead}
      </p>
    </Container>
  );
}
