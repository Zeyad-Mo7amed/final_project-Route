import CheckOut from "../../_components/CheckOut/CheckOut";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <CheckOut id={id} />
    </>
  );
}
