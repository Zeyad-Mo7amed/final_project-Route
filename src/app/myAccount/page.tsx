import { getServerSession } from "next-auth";
import MyAccount from "../_components/MyAccount/MyAccount";
import { nextAuthConfig } from "@/auth";
import { getAllAddress } from "@/api/getAllAddress.api";

export default async function Page() {
  const session = await getServerSession(nextAuthConfig);
  const token = session?.user?.token;
  const getdataAllAddress = await getAllAddress(token as string);
  console.log(getdataAllAddress);
  
  
  return (
    <>
      <MyAccount token={token as string} getdataAllAddress={getdataAllAddress} />
    </>
  );
}
