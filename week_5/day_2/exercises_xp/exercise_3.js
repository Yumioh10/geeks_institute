// Exercise 3:
// --- MOCKING SETUP to bypass Content Security Policy (CSP) ---

// 1. A simple class to simulate the structure of a real Response object
class MockResponse {
    constructor(status, data) {
        this.status = status;
        this.ok = status >= 200 && status < 300;
        this.data = data;
    }
    // Must implement the .json() method that returns a Promise
    async json() {
        return this.data;
    }
}

// 2. The mock fetch function simulates network delay and returns mock data
async function mockFetch(url) {
    // Simulate an asynchronous network delay (500ms)
    console.log("Status: Simulating network call (1.5 seconds delay)...");
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock successful data structure (to satisfy the original .result requirement)
    const mockStarshipData = {
        result: {
            properties: {
                model: "Millennium Falcon",
                manufacturer: "Corellian Engineering Corporation",
                cost_in_credits: "100000",
                crew: "4",
                hyperdrive_rating: "0.5",
                passengers: "6"
            },
            description: "Data successfully loaded via mock function.",
        }
    };

    // Return a mocked successful response (Status 200)
    return new MockResponse(200, mockStarshipData);
}

// --- ASYNC FUNCTION (Solution) ---

async function getStarshipData() {
    const url = "https://www.swapi.tech/api/starships/9/";

    // Use the mockFetch function to avoid real network calls
    const fetchToUse = mockFetch;

    // 1. Use try...catch for comprehensive error handling
    try {
        // 2. Await the mock fetch request (no .then() method used)
        const response = await fetchToUse(url);

        // 3. Check the status of the Response
        if (!response.ok) {
            // Throw an error if the HTTP status is not successful
            const errorDetails = await response.json();
            throw new Error(`HTTP Error! Status: ${response.status}. Details: ${errorDetails.detail || 'Unknown error'}`);
        }

        // 4. Await parsing the response body as JSON
        const starshipData = await response.json();

        // 5. Log the required result object (objectStarWars.result)
        console.log("\n--- Data Retrieval Success ---");
        console.log("The required output (objectStarWars.result) is:");
        console.log(starshipData.result);

    } catch (error) {
        // Catch any errors from network simulation or status check
        console.error("\n--- Data Retrieval Error ---");
        console.error("An error occurred during data retrieval:", error.message);
    }
}

// Execute the async function
getStarshipData();

// Exercise 4:
/* Analyse: Step-by-Step Execution 
1. asyncCall() is invoked: The execution begins by calling asyncCall().
2. First console.log: The first line inside asyncCall() executes immediately:
3. Promise Creation and await: The code encounters let result = await resolveAfter2Seconds();.
The resolveAfter2Seconds function is called, which immediately returns a new Promise.
The await keyword pauses the execution of asyncCall and yields control back to the main event loop. This pause does not block the entire program; it just halts the asyncCall function specifically.
The setTimeout inside the Promise starts its 2000 millisecond (2-second) timer.
4. The Pause (2 Seconds): The program effectively waits for two seconds while the timer runs.
5. Promise Resolution: After the two-second delay, the setTimeout callback executes, calling resolve('resolved'). This fulfills the Promise.
6. asyncCall Resumes: Because the Promise has resolved, the await expression evaluates to the resolved value, 'resolved'. This value is assigned to the result variable.
7. Second console.log: The final line of asyncCall executes:
*/
