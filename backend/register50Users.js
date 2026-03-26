const URL = 'http://localhost:5000/api/auth/register';

const run = async () => {
  console.log('Starting to send 50 automated registration requests...\n');
  
  let successCount = 0;
  let failCount = 0;

  // Change this number if you want to send more or fewer requests
  const totalRequests = 50; 

  const promises = [];

  for (let i = 1; i <= totalRequests; i++) {
    // Generate a random ID so we don't trigger "User already exists" errors
    const randomSuffix = Math.floor(Math.random() * 1000000);
    
    const body = {
      name: `Test User ${randomSuffix}`,
      email: `testuser${randomSuffix}@example.com`,
      password: 'password123'
    };

    const requestPromise = fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(async (res) => {
      if (res.ok) {
        successCount++;
        process.stdout.write('✅ ');
      } else {
        failCount++;
        process.stdout.write('❌ ');
      }
    })
    .catch((error) => {
      failCount++;
      process.stdout.write('🚨 ');
    });

    promises.push(requestPromise);
  }

  // Wait for all 50 concurrent requests to finish
  await Promise.all(promises);

  console.log(`\n\nFinished!`);
  console.log(`Successfully registered: ${successCount} users`);
  console.log(`Failed to register: ${failCount} users`);
};

run();
