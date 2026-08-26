const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/cms";

export async function getItems(section: string) {
  const response = await fetch(
    `${API_URL}/${section}`
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || "Failed to load data"
    );
  }

  return result.data;
}

export async function createItem(
  section: string,
  data: unknown
) {
  const response = await fetch(
    `${API_URL}/${section}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || "Failed to create item"
    );
  }

  return result.data;
}

export async function updateItem(
  section: string,
  id: number,
  data: unknown
) {
  const response = await fetch(
    `${API_URL}/${section}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || "Failed to update item"
    );
  }

  return result.data;
}

export async function deleteItem(
  section: string,
  id: number
) {
  const response = await fetch(
    `${API_URL}/${section}/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || "Failed to delete item"
    );
  }

  return result;
}