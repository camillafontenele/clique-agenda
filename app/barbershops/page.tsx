import BarbershopItem from "@/components/barbershop-item";
import Header from "@/components/header";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import { getBarbershopsByServiceName } from "@/data/Barbershops";

const BarbershopsPage = async ({ searchParams }: PageProps<"/barbershops">) => {
  const { search } = await searchParams;
  const searchTerm = typeof search === "string" ? search.trim() : "";
  const barbershops = searchTerm
    ? await getBarbershopsByServiceName(searchTerm)
    : [];

  return (
    <div>
      <Header />
      <PageContainer>
        <h1 className="text-xl font-bold">Barbearias encontradas</h1>

        <PageSectionContent>
          <PageSectionTitle>
            Resultados para "{searchTerm || "Resultados"}"
          </PageSectionTitle>
          {barbershops.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhuma barbearia encontrada para esta busca.
            </p>
          )}
        </PageSectionContent>
      </PageContainer>
    </div>
  );
};

export default BarbershopsPage;
