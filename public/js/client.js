async function registerServiceWorker() {
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    
    let subscription = await register.pushManager.getSubscription();
  
    if(subscription === null) {
            subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicVapidKey,
        });
        await fetch("/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
}



if('serviceWorker' in navigator) {
    registerServiceWorker().catch(console.log)
}