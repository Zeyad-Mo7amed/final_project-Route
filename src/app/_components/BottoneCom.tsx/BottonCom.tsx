"use client";
import { addToCart } from "@/api/cart/actions/addcart.action";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { FaCheck } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BottonProps {
  children: ReactNode;
  id: string;
  cls?: string; 
  token?: string; 
}

export default function BottonCom({
  children,
  cls = "", 
  id,
}: BottonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => addToCart(id),

    onMutate: () => {
      setStatus("loading");
    },

    onSuccess: (data) => {
      if (data?.status === "success") {
        setStatus("success");
        toast.success("Item added to cart successfully");

        queryClient.invalidateQueries({ queryKey: ["cart"] });

        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("idle");
        toast.error("Something went wrong");
      }
    },

    onError: () => {
      setStatus("idle");
      toast.error("Failed to add item to cart");
    },
  });

  function handleAddToCart() {
    mutate(id);
  }

  return (
    <Button
      onClick={handleAddToCart}
      className={cls}
      disabled={status === "loading" || status === "success"}
    >
      {status === "loading" && <Spinner />}
      {status === "success" && <FaCheck className="text-white" />}
      {status === "idle" && children}
    </Button>
  );
}
