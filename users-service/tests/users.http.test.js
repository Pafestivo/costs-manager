/**
 * Users API HTTP tests
 * Run server first, then execute this file with Node
 */

const BASE_URL = "http://localhost:3001";

async function testGetAllUsers() {
    const res = await fetch(`${BASE_URL}/api/users`);
    console.assert(res.status === 200, "GET /api/users should return 200");

    const body = await res.json();
    console.assert(Array.isArray(body), "GET /api/users should return an array");
}

async function testAddUserValidationFail() {
    const res = await fetch(`${BASE_URL}/api/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 1 }),
    });

    console.assert(res.status === 400, "POST /api/users/add should fail on missing fields");

    const body = await res.json();
    console.assert(body.id, "Error response should include id");
    console.assert(body.message, "Error response should include message");
}

async function testAddUserSuccess() {
    const res = await fetch(`${BASE_URL}/api/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: 1001,
            first_name: "test",
            last_name: "user",
            birthday: "2000-01-01",
        }),
    });

    console.assert(res.status === 200, "POST /api/users/add should succeed");

    const body = await res.json();
    console.assert(body.id === 1001, "Created user id should be 1001");
}

async function testGetUserWithTotal() {
    const res = await fetch(`${BASE_URL}/api/users/1001`);
    console.assert(res.status === 200, "GET /api/users/:id should return 200");

    const body = await res.json();
    console.assert(body.id === 1001, "Returned user id should be 1001");
    console.assert(body.total !== undefined, "Returned user should include total");
}

async function runTests() {
    console.log("Running Users API HTTP tests...");

    await testGetAllUsers();
    await testAddUserValidationFail();
    await testAddUserSuccess();
    await testGetUserWithTotal();

    console.log("All Users API tests passed ✅");
}

runTests().catch((err) => {
    console.error("Tests failed ❌", err);
    process.exit(1);
});
