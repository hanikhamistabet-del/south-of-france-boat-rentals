"use client";

export default function DeleteBoatButton({
  boatId,
}: {
  boatId: number;
}) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this boat?"
    );

    if (!confirmed) return;

    const response = await fetch(
      "/api/delete-boat",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          boatId,
        }),
      }
    );

    if (!response.ok) {
      alert("Delete failed");
      return;
    }

    alert("Boat deleted!");

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 px-4 py-2 rounded-lg"
    >
      Delete
    </button>
  );
}