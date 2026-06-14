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

    try {
      const response = await fetch(
        "/api/delete-boat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boatId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Delete failed");
        return;
      }

      alert("Boat deleted successfully");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
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