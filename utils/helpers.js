require('dotenv').config();
module.exports={
    vapid_public_key:(loggedIn) =>{
        return `
        <script type="text/javascript">
            const publicVapidKey = "${process.env.VAPID_PUBLIC_KEY}";
            const loggedIn = ${Boolean(loggedIn)};
        </script>`;
    },
}