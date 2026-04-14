"use client";
export default function error({ error }: { error: Error }) {
  return (
    <div className="my-5">
      <h2 className="text-red-800">{error.message}</h2>
    </div>
  );
}
