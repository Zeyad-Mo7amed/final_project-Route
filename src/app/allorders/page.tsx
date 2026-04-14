import { getAllOrder } from "@/api/getAllOrder.api";
import Allorders from "../_components/Allorders/Allorders";

export default async function page() {
  const dataUser = await getAllOrder();
  return (
    <>
      <Allorders dataUser ={dataUser}/>
    </>
  );
}
