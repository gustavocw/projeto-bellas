import React from 'react'

const teste = () => {
  return (
    <div>teste</div>
  )
}

export default teste


// import React, { useState } from "react";
// import axios from "axios";

// const teste = () => {
//   async function getData() {
//     const response = await axios.get(
//       "https://api.eumidas.com.br/isonwa?receiver=351932136888&token=heZD93Lyq8yJxzZMXhYC"
//     );
//     console.log(response.data);
//   }

//   getData();

//   async function postData() {
//     const url = "https://api.eumidas.com.br/isonwa";
//     const data = {
//       receiver: "351932136888",
//       token: "heZD93Lyq8yJxzZMXhYC",
//     };

//     try {
//       const response = await axios.post(url, data, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         timeout: 30000,
//       });
//       console.log(response.data); // Output {success:true/false, isonwa:true/false}
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   postData();

//   const click = () => {
//     const nodeurl = "https://api.eumidas.com.br/send";
//     // const mediaurl = "https://painel.eumidas.com.br/public/users/1/avatar.png";

//     // const buttons = {
//     //   replyButtons: [
//     //     {
//     //       buttonId: "yesContinue",
//     //       buttonText: { displayText: "YES" },
//     //       type: 1,
//     //     },
//     //     { buttonId: "noContinue", buttonText: { displayText: "NO" }, type: 1 },
//     //     { buttonId: "info", buttonText: { displayText: "More Info" }, type: 1 },
//     //   ],
//     //   footerText: "This is footer",
//     // };

//     const data = {
//       receiver: "351932136888",
//       msgtext: `*Seja bem vinda(o) ao Bellas* \n\nSeu perfil será analizado por nossa equipe, caso seu anuncio for aprovado, receberá uma mensagem de aviso. \u2764\ufe0f`,
//       token: "heZD93Lyq8yJxzZMXhYC",
//       // mediaurl: mediaurl,
//     };

//     axios
//       .post(nodeurl, data)
//       .then((response) => {
//         console.log(response.data)
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div style={{ backgroundColor: "#fff" }}>
//       <button onClick={click}>CLICK</button>
//     </div>
//   );
// };

// export default teste;
