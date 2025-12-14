import VehicleDetailsPage from '@/components/VehicleDetailsPage/VehicleDetailsPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogItemPage({ params }: PageProps) {
  const { id } = await params;

  return <VehicleDetailsPage vehicleId={id} />;
}
