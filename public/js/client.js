const publicVapidKey = "BJRA9Ov1NkqMUYb0RmC0WJrhMF-8ak-dTljxVqtanouSQYKiQLhz_WUpHVhMwpPqFni0gNO5Ee2LA28UR5809-0";

async function registerServiceWorker() {
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });

    const subscription = await register.pushManager.subscribe({
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



if('serviceWorker' in navigator) {
    registerServiceWorker().catch(console.log)
}