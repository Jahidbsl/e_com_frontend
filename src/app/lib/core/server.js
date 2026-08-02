const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  const backend = await fetch(`${baseurl}${path}`, {
    cache: "no-store",
  });
  if (!backend.ok) {
    throw new Error(`Failed to fetch data from the server: ${backend.status} ${backend.statusText}`);
  }
  const text = await backend.text();
  return text ? JSON.parse(text) : null;
};

export const serverMutation = async (path, data) => {
  const backend = await fetch(`${baseurl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!backend.ok) {
    throw new Error(`Failed to post data to the server: ${backend.status} ${backend.statusText}`);
  }
  const text = await backend.text();
  return text ? JSON.parse(text) : null;
};

const serverPatch = async (path, data) => {
  const backend = await fetch(`${baseurl}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!backend.ok) {
    throw new Error(`Failed to patch data on the server: ${backend.status} ${backend.statusText}`);
  }
  const text = await backend.text();
  return text ? JSON.parse(text) : null;
};

export const serverDelete = async (path) => {
  const backend = await fetch(`${baseurl}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!backend.ok) {
    throw new Error(`Failed to delete data from the server: ${backend.status} ${backend.statusText}`);
  }
  const text = await backend.text();
  return text ? JSON.parse(text) : { success: true };
};