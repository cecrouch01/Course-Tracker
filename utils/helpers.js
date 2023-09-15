require('dotenv').config();
module.exports={
    vapid_public_key:() =>{
        return `
        <script type="text/javascript">
            const publicVapidKey = "${process.env.VAPID_PUBLIC_KEY}"
        </script>`;
    },
}