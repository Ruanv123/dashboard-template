export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  return (
    <div>
      <h1>Product id: {(await params).productId}</h1>
    </div>
  );
}
