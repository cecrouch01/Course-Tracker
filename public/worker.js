self.addEventListener('push', function(e) {
    const data = e.data.json();
    console.log(data);
    const promiseChain = self.registration.showNotification(
        data.title,
        {
            body: data.body,
        }
    );
    e.waitUntil(promiseChain)
})