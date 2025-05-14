
const TEST_HEALTHCHECK_URL = "http://localhost:5030/api/game/healthcheck";

export async function healthcheck() {
  try {
    const response = await fetch(`${TEST_HEALTHCHECK_URL}`);
    const data = await response.json();
    console.log("healthcheck()", data);
    return data;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}
